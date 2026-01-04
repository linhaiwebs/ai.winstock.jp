import { Star } from 'lucide-react';
import { StockInfo } from '../types/stock';

interface StockHeaderProps {
  info: StockInfo;
}

export default function StockHeader({ info }: StockHeaderProps) {
  const isPositive = info.change.includes('+');
  const changeColor = isPositive ? 'text-green-600' : info.change === '0.0' ? 'text-gray-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{info.code}</h1>
            <span className="text-2xl text-gray-700">{info.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded">
              {info.market}
            </span>
            <span className="text-sm text-gray-500">{info.timestamp}</span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Star className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-5xl font-bold text-gray-900">¥{info.price}</span>
        <div className="flex flex-col">
          <span className={`text-xl font-semibold ${changeColor}`}>
            {info.change}
          </span>
          <span className={`text-lg ${changeColor}`}>
            {info.changePercent}%
          </span>
        </div>
      </div>

      {info.ptsPrice && (
        <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
          <span className="text-sm font-semibold text-gray-600">PTS</span>
          <span className="text-lg font-bold text-gray-900">¥{info.ptsPrice}</span>
          <span className="text-sm text-gray-500">{info.ptsTime}</span>
        </div>
      )}
    </div>
  );
}
