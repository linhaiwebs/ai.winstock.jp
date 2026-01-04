import { useEffect, useState } from 'react';
import RobotAnalysisAnimation from './RobotAnalysisAnimation';

export default function DiagnosisProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const animateProgress = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) {
            return prev + Math.random() * 15;
          } else if (prev < 98) {
            return prev + Math.random() * 2;
          }
          return prev;
        });
      }, 100);
    };

    animateProgress();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-dark-secondary rounded-lg shadow-red-glow border-2 border-accent-red/30 p-8">
        <RobotAnalysisAnimation />

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 text-center">AI診断を実行中</h3>
          <p className="text-sm text-gray-400 text-center">市場データを分析しています...</p>
        </div>

        <div className="relative w-full h-3 bg-dark-card rounded-full overflow-hidden mb-3 border border-gray-700">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-red to-red-600 transition-all duration-300 ease-out shadow-red-glow"
            style={{ width: `${Math.min(progress, 99)}%` }}
          />
        </div>

        <div className="mb-6 text-center">
          <span className="text-sm font-semibold text-accent-red">
            {Math.floor(Math.min(progress, 99))}%
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
  );
}
