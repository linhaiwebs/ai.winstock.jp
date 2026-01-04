import { StockPrice } from '../types/stock';

interface StockPriceTableProps {
  prices?: StockPrice[];
}

export default function StockPriceTable({ prices }: StockPriceTableProps) {
  const getChangeClass = (change: string) => {
    if (change.includes('+')) return 'text-green-400';
    if (change === '0.0' || change === '0.00') return 'text-gray-400';
    return 'text-red-400';
  };

  const placeholderRows = Array(7).fill(null).map((_, i) => ({
    date: '----/--/--',
    open: '---',
    high: '---',
    low: '---',
    close: '---',
    change: '---',
    changePercent: '---',
    volume: '---'
  }));

  const displayPrices = prices && prices.length > 0 ? prices : placeholderRows;

  return (
    <div className="relative z-10 bg-gradient-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-xl rounded-2xl border border-blue-600/30 shadow-2xl overflow-hidden">
      <div className="border-b border-blue-800/30 px-6 py-4">
        <h3 className="text-lg font-bold text-cyan-300">価格推移</h3>
      </div>

      <style>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .scroll-container {
          animation: scrollUp 20s linear infinite;
        }

        .scroll-wrapper:hover .scroll-container {
          animation-play-state: paused;
        }
      `}</style>

      <div className="p-6">
        <div className="block md:hidden space-y-3 max-h-[400px] overflow-hidden scroll-wrapper">
          <div className="scroll-container">
            {[...displayPrices.slice(0, 7), ...displayPrices.slice(0, 7)].map((price, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-3 border border-blue-700/30 mb-3">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-blue-800/30">
                  <span className="text-sm font-bold text-cyan-300">{price.date}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-300/70">終値</span>
                    <span className="text-base font-bold text-blue-100">{price.close}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-blue-300/70">始値</span>
                    <span className="text-blue-200 font-semibold">{price.open}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300/70">高値</span>
                    <span className="text-green-400 font-semibold">{price.high}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300/70">安値</span>
                    <span className="text-red-400 font-semibold">{price.low}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300/70">出来高</span>
                    <span className="text-blue-200 font-semibold">{price.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300/70">前日比</span>
                    <span className={`font-semibold ${getChangeClass(price.change)}`}>{price.change}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300/70">騰落率</span>
                    <span className={`font-semibold ${getChangeClass(price.change)}`}>{price.changePercent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <div className="max-h-[400px] overflow-hidden scroll-wrapper">
            <div className="scroll-container">
              <table className="w-full">
                <thead className="bg-slate-800/50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-300">日付</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-cyan-300">始値</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-cyan-300">高値</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-cyan-300">安値</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-cyan-300">終値</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-cyan-300">前日比</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-cyan-300">騰落率</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-cyan-300">出来高</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-800/30">
                  {[...displayPrices.slice(0, 7), ...displayPrices.slice(0, 7)].map((price, index) => (
                    <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-200">
                        {price.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-300 text-right">
                        {price.open}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400 font-semibold text-right">
                        {price.high}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-400 font-semibold text-right">
                        {price.low}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-cyan-300 text-right">
                        {price.close}
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold text-right ${getChangeClass(price.change)}`}>
                        {price.change}
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold text-right ${getChangeClass(price.change)}`}>
                        {price.changePercent}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-300 text-right">
                        {price.volume}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
