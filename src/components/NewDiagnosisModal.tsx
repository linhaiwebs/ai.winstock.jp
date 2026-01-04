import { X, ExternalLink, MessageSquare, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

interface NewDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: string;
  stockCode: string;
  stockName: string;
  stockPrice: string;
  priceChange: string;
  onLineConversion: () => void;
  isStreaming?: boolean;
  isConnecting?: boolean;
}

export default function NewDiagnosisModal({
  isOpen,
  onClose,
  analysis,
  stockCode,
  stockName,
  stockPrice,
  priceChange,
  onLineConversion,
  isStreaming = false,
  isConnecting = false,
}: NewDiagnosisModalProps) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.removeAttribute('data-modal-open');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm" style={{ touchAction: 'none' }}>
      <div className="relative w-full max-w-2xl max-h-[95vh] bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-blue-600/30" style={{ touchAction: 'auto' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 pointer-events-none"></div>

        <div className="relative sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 sm:px-5 sm:py-3 flex items-center justify-between border-b border-blue-500/30 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-white/20 p-1 sm:p-1.5 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-white">AI診断完了</h2>
              <p className="text-[10px] sm:text-xs text-blue-100 hidden sm:block">モメンタム分析・リアルタイムデータ・AIロジック</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
            aria-label="閉じる"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        <div className="relative overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(95vh-200px)] px-3 py-3 sm:px-5 sm:py-4 space-y-3 sm:space-y-4">
          {stockName && stockPrice ? (
            <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-600/30">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg font-bold text-white shadow-lg text-xs sm:text-sm">
                  {stockCode}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-blue-100">{stockName}</div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm text-blue-300/70">現在の株価:</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-300">{stockPrice}</span>
                  <span className="text-sm sm:text-base font-semibold text-blue-200">円</span>
                </div>

                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm text-blue-300/70">前日比:</span>
                  <span className={`text-sm sm:text-base md:text-lg font-bold ${
                    priceChange.includes('-') ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {priceChange}
                  </span>
                </div>
              </div>
            </div>
          ) : null}

          <div className="relative bg-gradient-to-br from-slate-800/60 to-blue-900/60 backdrop-blur-xl rounded-lg sm:rounded-xl p-4 sm:p-5 border border-cyan-600/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="relative space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <h3 className="text-sm sm:text-base font-bold text-cyan-300">LINE でさらに詳しい分析を</h3>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4 border border-blue-700/30 backdrop-blur-sm">
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed whitespace-pre-wrap">
                  {isConnecting ? '接続中...' : isStreaming ? analysis + '▊' : analysis}
                </p>
              </div>

              <button
                onClick={onLineConversion}
                disabled={isConnecting || isStreaming}
                className="w-full bg-gradient-to-r from-[#06C755] to-[#05b04b] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-[#05b04b] hover:to-[#049c42] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                LINEで詳細な診断レポートを受け取る
              </button>

              <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-600/30">
                <p className="text-xs sm:text-sm text-green-300 leading-relaxed">
                  メッセージを送信した瞬間にAI診断が始まり、最新レポートが即座に届きます。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-2.5 sm:p-3">
            <p className="text-[10px] sm:text-xs text-yellow-300/80 leading-relaxed">
              <strong className="font-semibold">免責事項：</strong>
              本サービスは金融商品の取引を勧誘するものではなく、情報提供のみを目的としています。診断結果は投資助言ではありません。株式投資には価格変動リスク、信用リスクなどが伴い、損失を被る可能性があります。最終的な投資判断はご自身の責任において行ってください。
            </p>
          </div>
        </div>

        <div className="relative sticky bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent px-3 py-3 sm:px-5 sm:py-4 border-t border-blue-800/30 backdrop-blur-sm">
          <p className="text-[10px] sm:text-xs text-blue-300/70 text-center">
            {stockName ? (
              <>「AI 株式 アシスタント」を追加して、銘柄コード「{stockName}」または「{stockCode}」を送信</>
            ) : (
              <>「AI 株式 アシスタント」を追加して、「{stockCode}」を送信</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
