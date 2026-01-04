import { TrendingUp, TrendingDown, Calendar, Building2 } from 'lucide-react';
import { StockInfo } from '../types/stock';

interface CompactStockInfoProps {
  info: StockInfo;
}

export default function CompactStockInfo({ info }: CompactStockInfoProps) {
  const isPositive = info.change.includes('+');
  const changeColor = isPositive ? 'text-green-600' : info.change === '0.0' ? 'text-gray-600' : 'text-red-600';
  const changeBgColor = isPositive ? 'bg-green-50' : info.change === '0.0' ? 'bg-gray-50' : 'bg-red-50';

  return (
    <div className="bg-dark-secondary rounded-xl shadow-red-glow overflow-hidden border-2 border-accent-red/30">
      <div className="bg-gradient-to-r from-accent-red to-accent-red-dark px-4 sm:px-6 py-4 sm:py-5">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Market Badge - At the top */}
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500 rounded-lg shadow-lg">
              <span className="text-sm font-bold text-white">{info.market}</span>
            </div>
            <span className="ml-3 text-xs text-gray-300">{info.timestamp}</span>
          </div>

          {/* Stock Code and Name - Full width */}
          <div className="mb-4 space-y-2">
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <h1 className="text-2xl font-bold text-white">{info.code}</h1>
            </div>
            <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <h2 className="text-lg font-bold text-white">{info.name}</h2>
            </div>
          </div>

          {/* Price and Change - Left-Right Layout */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-gray-300 font-medium mb-1">現在値</div>
              <div className="text-3xl font-bold text-white">¥{info.price}</div>
            </div>
            <div className={`flex items-center gap-1.5 px-4 py-2 rounded-lg ${changeBgColor}`}>
              {isPositive ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <div>
                <div className={`text-lg font-bold ${changeColor}`}>
                  {info.change}
                </div>
                <div className={`text-sm font-semibold ${changeColor}`}>
                  ({info.changePercent}%)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg inline-block border border-white/20">
              <h1 className="text-3xl font-bold text-white">{info.code}</h1>
            </div>
            <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <h2 className="text-xl font-bold text-white">{info.name}</h2>
            </div>
            <div className="flex items-center gap-2 mt-1 ml-1">
              <span className="text-xs text-gray-300 font-medium">{info.market}</span>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs text-gray-300">{info.timestamp}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 flex-1">
            <div className="text-right">
              <div className="text-sm text-gray-300 font-medium mb-1">現在値</div>
              <div className="text-5xl font-bold text-white">¥{info.price}</div>
            </div>
            <div className={`inline-flex items-center gap-1 px-4 py-2 rounded-full ${changeBgColor}`}>
              {isPositive ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className={`text-base font-bold ${changeColor}`}>
                {info.change} ({info.changePercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 sm:py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="bg-dark-card rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 font-semibold mb-1">PER</div>
              <div className="text-xl font-bold text-white">{info.per}<span className="text-sm">倍</span></div>
            </div>

            <div className="bg-dark-card rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 font-semibold mb-1">PBR</div>
              <div className="text-xl font-bold text-white">{info.pbr}<span className="text-sm">倍</span></div>
            </div>

            <div className="bg-dark-card rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 font-semibold mb-1">配当利回り</div>
              <div className="text-xl font-bold text-white">{info.dividend}<span className="text-sm">%</span></div>
            </div>

            <div className="bg-dark-card rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 font-semibold mb-1">信用倍率</div>
              <div className="text-xl font-bold text-white">{info.creditRatio}<span className="text-sm">倍</span></div>
            </div>

            <div className="bg-dark-card rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 font-semibold mb-1">時価総額</div>
              <div className="text-lg font-bold text-white">{info.marketCap}<span className="text-xs">億円</span></div>
            </div>

            <div className="bg-dark-card rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 font-semibold mb-1">単位</div>
              <div className="text-lg font-bold text-white">{info.unit}</div>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">業種:</span>
              <span className="text-sm font-semibold text-accent-red">{info.industry}</span>
            </div>

            {info.earningsDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">決算予定:</span>
                <span className="text-sm font-semibold text-gray-200">{info.earningsDate}</span>
              </div>
            )}
          </div>
        </div>

        {info.ptsPrice && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center gap-3 bg-dark-card rounded-lg px-4 py-2 border border-yellow-500/30">
              <span className="text-sm font-bold text-yellow-400">PTS</span>
              <span className="text-lg font-bold text-white">¥{info.ptsPrice}</span>
              <span className="text-xs text-gray-400">{info.ptsTime}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
