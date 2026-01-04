import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import FluidBackground from '../components/FluidBackground';
import SimplifiedStockInfo from '../components/SimplifiedStockInfo';
import StockPriceTable from '../components/StockPriceTable';
import DiagnosisButton from '../components/DiagnosisButton';
import DiagnosisLoadingOverlay from '../components/DiagnosisLoadingOverlay';
import NewDiagnosisModal from '../components/NewDiagnosisModal';
import ApiStatsDisplay from '../components/ApiStatsDisplay';
import ComplianceNotice from '../components/ComplianceNotice';
import StockSearchInput from '../components/StockSearchInput';
import { StockData } from '../types/stock';
import { DiagnosisState } from '../types/diagnosis';
import { useUrlParams } from '../hooks/useUrlParams';
import { apiClient } from '../lib/apiClient';
import { userTracking } from '../lib/userTracking';
import { trackConversion } from '../lib/googleTracking';
import { isStockDataValid } from '../lib/stockValidation';
import { DIAGNOSIS_FALLBACK_MESSAGE } from '../lib/constants';

export default function NewHome() {
  const urlParams = useUrlParams();
  const [stockCode, setStockCode] = useState('');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [shouldStartDiagnosisAfterLoad, setShouldStartDiagnosisAfterLoad] = useState(false);

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

  const fetchStockData = async (code: string, startDiagnosisAfter = false) => {
    setLoading(true);
    if (startDiagnosisAfter) {
      setShouldStartDiagnosisAfterLoad(true);
    }

    try {
      const response = await apiClient.get(`/api/stock/data?code=${code}`);

      if (response.ok) {
        const data = await response.json();
        setStockData(data);
        setStockCode(code);
        setCurrentSearchQuery(code);
      }
    } catch (err) {
      console.error('Stock data fetch error:', err);
      setShouldStartDiagnosisAfterLoad(false);
    } finally {
      setLoading(false);
    }
  };

  const startDiagnosisProcess = useCallback(async () => {
    const codeToUse = stockCode;

    if (window.gtag) {
      window.gtag('event', 'Bdd');
    }

    setDiagnosisState('connecting');
    setDiagnosisStartTime(Date.now());
    setAnalysisResult('');
    setLoadingProgress(0);
    setShowLoadingOverlay(true);

    if (!stockData || !isStockDataValid(stockData)) {
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
          const staticMessage = DIAGNOSIS_FALLBACK_MESSAGE(codeToUse);
          setAnalysisResult(staticMessage);
          setDiagnosisState('results');
        }, 600);
      }, 2000);

      return;
    }

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
          code: codeToUse,
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
                    stockCode: codeToUse,
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
          stockCode: codeToUse,
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
        const staticMessage = DIAGNOSIS_FALLBACK_MESSAGE(codeToUse);
        setAnalysisResult(staticMessage);
        setDiagnosisState('results');
      }, 600);
    }
  }, [stockCode, stockData, diagnosisStartTime]);

  useEffect(() => {
    if (shouldStartDiagnosisAfterLoad && !loading && stockData && diagnosisState === 'initial') {
      setShouldStartDiagnosisAfterLoad(false);
      startDiagnosisProcess();
    }
  }, [shouldStartDiagnosisAfterLoad, loading, stockData, diagnosisState, startDiagnosisProcess]);

  const runDiagnosis = async () => {
    if (diagnosisState !== 'initial') return;

    const codeToUse = currentSearchQuery.trim() || stockCode;

    if (codeToUse !== stockCode) {
      await fetchStockData(codeToUse, true);
      return;
    }

    await startDiagnosisProcess();
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

      const lineUrl = data.link.redirect_url;
      window.location.href = lineUrl;


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

const closeModal = () => {
  setDiagnosisState('initial');
  setAnalysisResult('');
  setLoadingProgress(0);
  setShowLoadingOverlay(false);
  setDiagnosisStartTime(0);
};

  return (
    <>
      <FluidBackground />

      <div className="relative min-h-screen flex flex-col">
        <Header />
        <ApiStatsDisplay />

        <div className="relative z-10 max-w-[1400px] mx-full px-6 sm:px-8 lg:px-12 py-8 space-y-8 flex-1">
          {diagnosisState === 'initial' && (
            <>
              <SimplifiedStockInfo info={stockData?.info} />

              <div className="max-w-2xl mx-auto mb-6">
                <StockSearchInput
                  onSelectStock={fetchStockData}
                  currentStockCode={stockCode}
                  onSearchChange={setCurrentSearchQuery}
                />
              </div>

              <div className="max-w-2xl mx-auto">
                <DiagnosisButton onClick={runDiagnosis} />
              </div>

              <StockPriceTable prices={stockData?.prices} />

              <div className="max-w-2xl mx-auto">
                <DiagnosisButton onClick={runDiagnosis} />
              </div>
            </>
          )}

          <DiagnosisLoadingOverlay
            isVisible={showLoadingOverlay}
            progress={loadingProgress}
            onComplete={() => setShowLoadingOverlay(false)}
          />

          <NewDiagnosisModal
            isOpen={diagnosisState === 'streaming' || diagnosisState === 'results'}
            onClose={closeModal}
            analysis={analysisResult}
            stockCode={stockCode}
            stockName={stockData?.info.name || ''}
            stockPrice={stockData?.info.price || ''}
            priceChange={`${stockData?.info.change || ''} (${stockData?.info.changePercent || ''})`}
            onLineConversion={handleLineConversion}
            isStreaming={diagnosisState === 'streaming'}
            isConnecting={diagnosisState === 'connecting'}
          />
        </div>

        <ComplianceNotice />
      </div>
    </>
  );
}
