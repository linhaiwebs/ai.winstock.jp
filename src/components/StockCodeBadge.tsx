import { useState } from 'react';
import { TrendingUp, Info } from 'lucide-react';

interface StockCodeBadgeProps {
  code: string;
  name: string;
  per?: string;
  pbr?: string;
  dividend?: string;
  industry?: string;
  marketCap?: string;
}

export default function StockCodeBadge({ code, name, per, pbr, dividend, industry, marketCap }: StockCodeBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-2 border-blue-600/50 rounded-xl backdrop-blur-sm cursor-pointer hover:border-cyan-500/70 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <TrendingUp className="w-6 h-6 text-cyan-400" />
        <div className="flex flex-col gap-1">
          <span className="font-bold text-cyan-400 text-2xl leading-tight">{code}</span>
          <span className="font-medium text-blue-300/80 text-sm leading-tight">{name}</span>
        </div>
        <Info className="w-5 h-5 text-blue-400 animate-pulse" />
      </div>

      {showTooltip && (
        <div className="absolute top-full left-0 mt-3 w-80 bg-slate-900/95 border border-blue-600/50 rounded-xl shadow-2xl p-4 z-50 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="absolute -top-2 left-8 w-4 h-4 bg-slate-900 border-l border-t border-blue-600/50 transform rotate-45"></div>

          <h3 className="text-sm font-bold text-cyan-400 mb-3 pb-2 border-b border-blue-800/50">
            詳細データ
          </h3>

          <div className="space-y-2.5">
            {per && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-300/70">PER</span>
                <span className="text-sm font-semibold text-blue-100">{per}倍</span>
              </div>
            )}
            {pbr && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-300/70">PBR</span>
                <span className="text-sm font-semibold text-blue-100">{pbr}倍</span>
              </div>
            )}
            {dividend && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-300/70">配当利回り</span>
                <span className="text-sm font-semibold text-blue-100">{dividend}%</span>
              </div>
            )}
            {industry && (
              <div className="flex justify-between items-center pt-2 border-t border-blue-800/30">
                <span className="text-xs text-blue-300/70">業種</span>
                <span className="text-sm font-semibold text-cyan-300">{industry}</span>
              </div>
            )}
            {marketCap && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-300/70">時価総額</span>
                <span className="text-sm font-semibold text-blue-100">{marketCap}億円</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
