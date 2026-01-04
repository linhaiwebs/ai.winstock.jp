import { Sparkles, Zap } from 'lucide-react';

interface DiagnosisButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function DiagnosisButton({ onClick, disabled = false }: DiagnosisButtonProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#06C755] via-[#05b04b] to-[#06C755] rounded-2xl blur opacity-40 animate-pulse"></div>
      <button
        onClick={onClick}
        disabled={disabled}
        className="relative w-full bg-gradient-to-r from-[#06C755] to-[#05b04b] hover:from-[#05b04b] hover:to-[#049c42] disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 md:py-6 px-6 md:px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none"
      >
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <div className="relative">
            <Sparkles className="w-6 md:w-8 h-6 md:h-8 animate-pulse" />
            <Zap className="w-3 md:w-4 h-3 md:h-4 absolute -top-1 -right-1 text-yellow-300" />
          </div>
          <div className="text-center md:text-left">
            <div className="text-lg md:text-2xl">AI診断を受ける</div>
            <div className="text-xs md:text-sm text-white/90 font-normal">最新AIで徹底分析</div>
          </div>
        </div>

        <div className="absolute -top-2 md:-top-3 -right-2 md:-right-3 bg-white text-[#06C755] text-xs md:text-sm font-bold px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-lg transform rotate-12 animate-bounce border-2 border-[#06C755]">
          無料
        </div>
      </button>
    </div>
  );
}
