import { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import CompactStockInfo from '../components/CompactStockInfo';
import StockChart from '../components/StockChart';
import DiagnosisButton from '../components/DiagnosisButton';
import ComplianceNotice from '../components/ComplianceNotice';
import DiagnosisLoadingOverlay from '../components/DiagnosisLoadingOverlay';
import DiagnosisModal from '../components/DiagnosisModal';
import AdSenseBlock from '../components/AdSenseBlock';
import ApiStatsDisplay from '../components/ApiStatsDisplay';
import AiBrainGraphic from '../components/AiBrainGraphic';
import { StockData } from '../types/stock';
import { DiagnosisState } from '../types/diagnosis';
import { useUrlParams } from '../hooks/useUrlParams';
import { apiClient } from '../lib/apiClient';
import { userTracking } from '../lib/userTracking';
import { trackConversion } from '../lib/googleTracking';
import { generateDiagnosisReport } from '../lib/reportGenerator';
import { isStockDataValid } from '../lib/stockValidation';
import { DIAGNOSIS_FALLBACK_MESSAGE } from '../lib/constants';

export default function Home() {
  const urlParams = useUrlParams();
  const [stockCode, setStockCode] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState>('initial');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [diagnosisStartTime, setDiagnosisStartTime] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState<boolean>(false);

  useEffect(() => {
    if (urlParams.code) {
      setStockCode(urlParams.code);
      fetchStockData(urlParams.code);
    }
  }, [urlParams.code]);

  // Track page load
  useEffect(() => {
    const trackPageVisit = async () => {
      if (stockData) {
        await userTracking.trackPageLoad({
          stockCode: stockCode,
          stockName: stockData.info.name,
          urlParams: {
            src: urlParams.src || '',
            gclid: urlParams.gclid || '',
            racText: urlParams.racText || '',
            code: urlParams.code || ''
          }
        });
      }
    };

    trackPageVisit();
  }, [stockData, stockCode, urlParams]);

  const fetchStockData = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/api/stock/data?code=${code}`);

      if (!response.ok) {
        throw new Error('株価データの取得に失敗しました');
      }

      const data = await response.json();
      setStockData(data);
      setStockCode(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };


  const runDiagnosis = async () => {
    if (diagnosisState !== 'initial') return;

    if (window.gtag) {
      window.gtag('event', 'Bdd');
    }

    if (!stockData || !isStockDataValid(stockData)) {
      setDiagnosisState('connecting');
      setDiagnosisStartTime(Date.now());
      setAnalysisResult('');
      setLoadingProgress(0);
      setShowLoadingOverlay(true);

      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev < 100) {
            return prev + 5;
          }
          return prev;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(progressInterval);
        setLoadingProgress(100);

        setTimeout(() => {
          setShowLoadingOverlay(false);
          const staticMessage = DIAGNOSIS_FALLBACK_MESSAGE(stockCode);
          setAnalysisResult(staticMessage);
          setDiagnosisState('results');
        }, 600);
      }, 2000);

      return;
    }

    setDiagnosisState('connecting');
    setDiagnosisStartTime(Date.now());
    setAnalysisResult('');
    setLoadingProgress(0);
    setShowLoadingOverlay(true);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < 85) {
          return prev + Math.random() * 15;
        } else if (prev < 95) {
          return prev + Math.random() * 2;
        }
        return prev;
      });
    }, 100);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || ''}/api/gemini/diagnosis`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 50000);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: stockCode,
          stockData: {
            name: stockData.info.name,
            price: stockData.info.price,
            change: stockData.info.change,
            changePercent: stockData.info.changePercent,
            per: stockData.info.per,
            pbr: stockData.info.pbr,
            dividend: stockData.info.dividend,
            industry: stockData.info.industry,
            marketCap: stockData.info.marketCap,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error('AI診断に失敗しました');
      }

      setDiagnosisState('processing');

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullAnalysis = '';
        let firstChunk = true;

        if (!reader) {
          throw new Error('ストリーム読み取りに失敗しました');
        }

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const text = decoder.decode(value, { stream: true });
          const lines = text.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              try {
                const parsed = JSON.parse(data);

                if (parsed.error) {
                  throw new Error(parsed.error);
                }

                if (parsed.content) {
                  fullAnalysis += parsed.content;

                  if (firstChunk && fullAnalysis.trim().length > 0) {
                    setLoadingProgress(100);
                    setTimeout(() => {
                      setShowLoadingOverlay(false);
                      setDiagnosisState('streaming');
                    }, 600);
                    firstChunk = false;
                  }

                  setAnalysisResult(fullAnalysis);
                }

                if (parsed.done) {
                  setDiagnosisState('results');

                  const durationMs = Date.now() - diagnosisStartTime;
                  await userTracking.trackDiagnosisClick({
                    stockCode: stockCode,
                    stockName: stockData.info.name,
                    durationMs: durationMs
                  });
                }
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError);
              }
            }
          }
        }
      } else {
        const result = await response.json();

        if (!result.analysis || result.analysis.trim() === '') {
          throw new Error('診断結果が生成されませんでした');
        }

        setAnalysisResult(result.analysis);
        setDiagnosisState('results');

        const durationMs = Date.now() - diagnosisStartTime;
        await userTracking.trackDiagnosisClick({
          stockCode: stockCode,
          stockName: stockData.info.name,
          durationMs: durationMs
        });
      }
    } catch (err) {
      console.error('Diagnosis error:', err);
      clearInterval(progressInterval);
      setLoadingProgress(100);

      setTimeout(() => {
        setShowLoadingOverlay(false);
        const staticMessage = DIAGNOSIS_FALLBACK_MESSAGE(stockCode);
        setAnalysisResult(staticMessage);
        setDiagnosisState('results');
      }, 600);
    }
  };

  const handleLineConversion = async () => {
    try {
      const response = await apiClient.get('/api/line-redirects/select');

      if (!response.ok) {
        console.error('Failed to get LINE redirect link');
        alert('LINEリンクの取得に失敗しました。しばらくしてからもう一度お試しください。');
        return;
      }

      const data = await response.json();

      if (!data.success || !data.link) {
        console.error('No active LINE redirect links available');
        alert('現在利用可能なLINEリンクがありません。');
        return;
      }

      const lineUrl = data.link.line_url;
      window.open(lineUrl, '_blank');

      trackConversion();

      await userTracking.trackConversion({
        gclid: urlParams.gclid
      });

      console.log('LINE conversion tracked successfully');
    } catch (error) {
      console.error('LINE conversion error:', error);
      alert('操作に失敗しました。しばらくしてからもう一度お試しください。');
    }
  };

  const handleReportDownload = async () => {
    try {
      const response = await apiClient.get('/api/line-redirects/select');
      let lineRedirectUrl = '';

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.link) {
          lineRedirectUrl = data.link.line_url;
        }
      }

      await generateDiagnosisReport({
        stockCode: stockCode,
        stockName: stockData?.info.name || '',
        analysis: analysisResult,
        lineRedirectUrl: lineRedirectUrl
      });

      await userTracking.trackEvent({
        sessionId: sessionStorage.getItem('sessionId') || '',
        eventType: 'report_download',
        stockCode: stockCode,
        stockName: stockData?.info.name || '',
        eventData: {
          reportFormat: 'docx',
          timestamp: new Date().toISOString()
        }
      });

      console.log('Report download tracked successfully');
    } catch (error) {
      console.error('Report download error:', error);
      alert('レポートのダウンロードに失敗しました。もう一度お試しください。');
    }
  };

  const closeModal = () => {
    setDiagnosisState('initial');
    setAnalysisResult('');
  };

  const hasOrganicResult = analysisResult.length > 0;

  return (
    <div className="min-h-screen bg-dark-primary">
      <ComplianceNotice />
      <ApiStatsDisplay />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section with Brain Graphic */}
        <div className="mb-8 md:mb-12">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left space-y-4 md:space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4">
                <div className="bg-gradient-to-br from-accent-red to-accent-red-dark p-2 md:p-3 rounded-xl shadow-red-glow">
                  <Brain className="w-8 md:w-10 h-8 md:h-10 text-white" />
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">AI株式診断</h1>
              </div>

              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                AIがあなたの銘柄を<br className="hidden sm:block" />徹底分析
              </h2>

              <p className="text-base md:text-lg text-gray-400">
                わずか数秒で、リスク・反応性・対反応をAIがスコア化！
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
                <span className="text-gray-500 text-sm md:text-base">対象:</span>
                <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-dark-secondary border-2 border-accent-red rounded-lg">
                  <span className="font-bold text-accent-red text-base md:text-lg">{stockCode || '読み込み中...'}</span>
                  {stockData && (
                    <span className="font-semibold text-gray-300 text-sm md:text-base">{stockData.info.name}</span>
                  )}
                </span>
              </div>
            </div>

            {/* Right side - AI Brain Graphic */}
            <div className="hidden lg:block">
              <AiBrainGraphic />
            </div>
          </div>

          {/* Mobile brain graphic */}
          <div className="lg:hidden mt-6 md:mt-8 max-w-xs mx-auto">
            <AiBrainGraphic />
          </div>
        </div>

        {error && diagnosisState !== 'error' && (
          <div className="mb-6 p-4 bg-dark-secondary border-2 border-accent-red rounded-lg max-w-2xl mx-auto">
            <p className="text-red-400 text-center font-semibold">{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-accent-red"></div>
            <p className="mt-4 text-gray-400">株価データを読み込んでいます...</p>
          </div>
        )}

        {stockData && !loading && diagnosisState === 'initial' && (
          <div className="space-y-5">
            <CompactStockInfo info={stockData.info} />

            <div className="max-w-3xl mx-auto">
              <DiagnosisButton onClick={runDiagnosis} />
            </div>

            <StockChart prices={stockData.prices} />

            <div className="max-w-3xl mx-auto">
              <DiagnosisButton onClick={runDiagnosis} />
            </div>
          </div>
        )}

        <DiagnosisLoadingOverlay
          isVisible={showLoadingOverlay}
          progress={loadingProgress}
          onComplete={() => setShowLoadingOverlay(false)}
        />

        {diagnosisState === 'error' && (
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto p-6 bg-dark-secondary border-2 border-accent-red rounded-lg">
              <h3 className="text-lg font-bold text-red-400 mb-3">診断エラー</h3>
              <p className="text-red-300 font-semibold mb-2 whitespace-pre-line">{error}</p>
              <div className="mt-4 p-3 bg-dark-card rounded text-left">
                <p className="text-xs text-red-400 mb-2 font-semibold">トラブルシューティング:</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                  <li>SiliconFlow API Keyが正しく設定されているか確認してください</li>
                  <li>API配額が残っているか確認してください</li>
                  <li>ネットワーク接続を確認してください</li>
                  <li>ブラウザのコンソールでエラー詳細を確認してください</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setDiagnosisState('initial');
                  setError(null);
                }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-accent-red to-accent-red-dark text-white font-bold rounded-lg hover:shadow-red-glow transition-all"
              >
                もう一度試す
              </button>
            </div>
          </div>
        )}

        <DiagnosisModal
          isOpen={diagnosisState === 'streaming' || diagnosisState === 'results'}
          onClose={closeModal}
          analysis={analysisResult}
          stockCode={stockCode}
          stockName={stockData?.info.name || ''}
          onLineConversion={handleLineConversion}
          onReportDownload={handleReportDownload}
          isStreaming={diagnosisState === 'streaming'}
          isConnecting={diagnosisState === 'connecting'}
        />

        {stockData && hasOrganicResult && (
          <AdSenseBlock
            shouldLoad={hasOrganicResult}
            racText={urlParams.racText}
          />
        )}
      </div>
    </div>
  );
}
