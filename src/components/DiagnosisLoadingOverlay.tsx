import { useEffect, useState } from 'react';
import RobotAnalysisAnimation from './RobotAnalysisAnimation';

interface DiagnosisLoadingOverlayProps {
  isVisible: boolean;
  progress: number;
  onComplete?: () => void;
}

export default function DiagnosisLoadingOverlay({
  isVisible,
  progress,
  onComplete
}: DiagnosisLoadingOverlayProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (progress >= 100 && isVisible) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, isVisible, onComplete]);

  useEffect(() => {
    if (isVisible) {
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
  }, [isVisible]);

  if (!isVisible && !isExiting) return null;

  return (
    <div
      className={`fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      <div className={`w-full max-w-2xl transition-transform duration-500 ${
        isExiting ? 'scale-95' : 'scale-100'
      }`}>
        <div className="bg-dark-secondary rounded-lg shadow-red-glow border-2 border-accent-red/30 p-8">
          <RobotAnalysisAnimation />

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 text-center">AI診断を実行中</h3>
            <p className="text-sm text-gray-400 text-center">市場データを分析しています...</p>
          </div>

          <div className="relative w-full h-3 bg-dark-card rounded-full overflow-hidden mb-3 border border-gray-700">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-red to-red-600 transition-all duration-300 ease-out shadow-red-glow"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="mb-6 text-center">
            <span className="text-sm font-semibold text-accent-red">
              {Math.floor(Math.min(progress, 100))}%
            </span>
          </div>

          <div className="bg-dark-card border-2 border-accent-red/30 rounded-lg p-6">
            <div className="space-y-3 text-sm">
              <p className="text-white font-semibold text-center text-base">
                📊 データはAIによって深度分析中です
              </p>
              <p className="text-gray-300 text-center">
                しばらくお待ちください
              </p>
              <div className="pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  すべてのデータは公開されている市場情報を使用しており、データの真実性と有効性を保証します。本分析は最新のAI技術により、財務指標、業界動向、市場トレンドを総合的に評価しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
