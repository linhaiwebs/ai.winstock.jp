import { TrendingUp, TrendingDown } from 'lucide-react';
import { StockInfo } from '../types/stock';
import StockCodeBadge from './StockCodeBadge';

interface SimplifiedStockInfoProps {
  info?: StockInfo;
}

export default function SimplifiedStockInfo({ info }: SimplifiedStockInfoProps) {
  const isPositive = info?.change.includes('+') ?? false;
  const changeColor = isPositive ? 'text-green-400' : info?.change === '0.0' ? 'text-gray-400' : 'text-red-400';

  return (
    <div className="relative z-10 bg-gradient-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-xl rounded-2xl border border-blue-600/30 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-cyan-600/5 pointer-events-none"></div>

      <div className="relative px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4">
            <StockCodeBadge
              code={info?.code || '----'}
              name={info?.name || '株価データの取得に失敗しました'}
              per={info?.per || '--'}
              pbr={info?.pbr || '--'}
              dividend={info?.dividend || '--'}
              industry={info?.industry || '--'}
              marketCap={info?.marketCap || '--'}
            />

            <div className="flex items-center gap-4 text-sm text-blue-300/70">
              {info ? (
                <>
                  <span>{info.market}</span>
                  <span>•</span>
                  <span>{info.timestamp}</span>
                </>
              ) : (
                <>
                  <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                  <span>•</span>
                  <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-row lg:items-end gap-4">
            <div>
              <div className="text-base font-semibold text-blue-300/70 mb-2">現在値</div>
              {info ? (
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  ¥{info.price}
                </div>
              ) : (
                <div className="h-8 w-32 bg-slate-700/50 rounded animate-pulse"></div>
              )}
            </div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-blue-700/30`}>
              {info ? (
                <>
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                  <span className={`text-lg font-bold ${changeColor}`}>
                    {info.change}
                  </span>
                  <span className={`text-base font-semibold ${changeColor}`}>
                    ({info.changePercent})
                  </span>
                </>
              ) : (
                <>
                  <div className="h-5 w-5 bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-slate-700/50 rounded animate-pulse"></div>
                </>
              )}
            </div>
          </div>
        </div>

        {info?.ptsPrice && (
          <div className="mt-6 pt-6 border-t border-blue-800/30">
            <div className="flex items-center gap-3 bg-yellow-900/20 rounded-lg px-4 py-3 border border-yellow-600/30">
              <span className="text-sm font-bold text-yellow-400">PTS取引</span>
              <span className="text-xl font-bold text-yellow-300">¥{info.ptsPrice}</span>
              <span className="text-xs text-yellow-300/70">{info.ptsTime}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
