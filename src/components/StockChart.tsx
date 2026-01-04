import { useState } from 'react';
import { BarChart3, Table as TableIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { StockPrice } from '../types/stock';

interface StockChartProps {
  prices: StockPrice[];
}

export default function StockChart({ prices }: StockChartProps) {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [activeChart, setActiveChart] = useState<0 | 1>(0);

  const chartData = prices.slice(0, 10).reverse().map(price => ({
    date: price.date,
    close: parseFloat(price.close.replace(/,/g, '')),
    open: parseFloat(price.open.replace(/,/g, '')),
    high: parseFloat(price.high.replace(/,/g, '')),
    low: parseFloat(price.low.replace(/,/g, '')),
    volume: parseInt(price.volume.replace(/,/g, ''))
  }));

  const getChangeClass = (change: string) => {
    if (change.includes('+')) return 'text-green-600';
    if (change === '0.0' || change === '0.00') return 'text-gray-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-dark-secondary rounded-xl shadow-red-glow overflow-hidden border-2 border-accent-red/30">
      <div className="px-0 py-0 bg-dark-card border-b border-gray-700">
        <div className="flex items-center justify-center w-full">
          <div className="flex gap-0 w-full">
            <button
              onClick={() => setViewMode('chart')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-4 font-semibold transition-all border-b-4 ${
                viewMode === 'chart'
                  ? 'bg-[#06C755] hover:bg-[#05b04b] text-white border-[#05b04b]'
                  : 'bg-dark-secondary text-gray-300 hover:bg-gray-700 border-gray-600'
              }`}
            >
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">チャート</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-4 font-semibold transition-all border-b-4 ${
                viewMode === 'table'
                  ? 'bg-[#06C755] hover:bg-[#05b04b] text-white border-[#05b04b]'
                  : 'bg-dark-secondary text-gray-300 hover:bg-gray-700 border-gray-600'
              }`}
            >
              <TableIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">テーブル</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'chart' ? (
        <div className="p-4 sm:p-6">
          <div className="relative -mx-4 sm:mx-0">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeChart * 100}%)` }}
              >
                <div className="w-full flex-shrink-0 px-4 sm:px-0">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">終値推移</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        stroke="#6b7280"
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        stroke="#6b7280"
                        domain={['dataMin - 50', 'dataMax + 50']}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1f2e',
                          border: '1px solid #dc2626',
                          borderRadius: '8px',
                          boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                          color: '#ffffff'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="close"
                        stroke="#dc2626"
                        strokeWidth={2}
                        fill="url(#colorClose)"
                        name="終値"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full flex-shrink-0 px-4 sm:px-0">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">高値・安値推移</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        stroke="#6b7280"
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        stroke="#6b7280"
                        domain={['dataMin - 50', 'dataMax + 50']}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1f2e',
                          border: '1px solid #dc2626',
                          borderRadius: '8px',
                          boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                          color: '#ffffff'
                        }}
                      />
                      <Legend wrapperStyle={{ color: '#9ca3af' }} />
                      <Line
                        type="monotone"
                        dataKey="high"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="高値"
                        dot={{ fill: '#10b981', r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="low"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="安値"
                        dot={{ fill: '#ef4444', r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveChart(0)}
              disabled={activeChart === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#06C755] hover:bg-[#05b04b] disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full shadow-lg transition-all"
              aria-label="前のチャート"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveChart(1)}
              disabled={activeChart === 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#06C755] hover:bg-[#05b04b] disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full shadow-lg transition-all"
              aria-label="次のチャート"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setActiveChart(0)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeChart === 0 ? 'bg-[#06C755] w-6' : 'bg-gray-500'
              }`}
              aria-label="チャート1を表示"
            />
            <button
              onClick={() => setActiveChart(1)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeChart === 1 ? 'bg-[#06C755] w-6' : 'bg-gray-500'
              }`}
              aria-label="チャート2を表示"
            />
          </div>
        </div>
      ) : (
        <div>
          {/* Mobile Card Layout */}
          <div className="block md:hidden p-4 space-y-3 max-h-96 overflow-y-auto">
            {prices.slice(0, 7).map((price, index) => (
              <div key={index} className="bg-dark-card rounded-lg p-3 border border-gray-700">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-700">
                  <span className="text-sm font-bold text-white">{price.date}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">終値</span>
                    <span className="text-base font-bold text-white">{price.close}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">始値</span>
                    <span className="text-gray-200 font-semibold">{price.open}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">高値</span>
                    <span className="text-green-400 font-semibold">{price.high}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">安値</span>
                    <span className="text-red-400 font-semibold">{price.low}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">出来高</span>
                    <span className="text-gray-200 font-semibold">{price.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">前日比</span>
                    <span className={`font-semibold ${getChangeClass(price.change)}`}>{price.change}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">騰落率</span>
                    <span className={`font-semibold ${getChangeClass(price.change)}`}>{price.changePercent}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-2 text-center">
              <p className="text-xs text-gray-400">直近7日間のデータを表示しています</p>
            </div>
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-dark-card sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300">日付</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">始値</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">高値</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">安値</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">終値</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">前日比</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">騰落率</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">出来高</th>
                  </tr>
                </thead>
                <tbody className="bg-dark-secondary divide-y divide-gray-700">
                  {prices.slice(0, 7).map((price, index) => (
                    <tr key={index} className="hover:bg-dark-card transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-200">
                        {price.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 text-right">
                        {price.open}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400 font-semibold text-right">
                        {price.high}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-400 font-semibold text-right">
                        {price.low}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-white text-right">
                        {price.close}
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold text-right ${getChangeClass(price.change)}`}>
                        {price.change}
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold text-right ${getChangeClass(price.change)}`}>
                        {price.changePercent}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 text-right">
                        {price.volume}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-dark-card border-t border-gray-700 text-center">
              <p className="text-xs text-gray-400">直近7日間のデータを表示しています</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
