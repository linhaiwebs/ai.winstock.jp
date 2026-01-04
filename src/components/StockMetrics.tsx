import { StockInfo } from '../types/stock';

interface StockMetricsProps {
  info: StockInfo;
}

export default function StockMetrics({ info }: StockMetricsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">PER</div>
          <div className="text-2xl font-bold text-gray-900">{info.per}<span className="text-sm font-normal text-gray-600">倍</span></div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">PBR</div>
          <div className="text-2xl font-bold text-gray-900">{info.pbr}<span className="text-sm font-normal text-gray-600">倍</span></div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">利回り</div>
          <div className="text-2xl font-bold text-gray-900">{info.dividend}<span className="text-sm font-normal text-gray-600">%</span></div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">信用倍率</div>
          <div className="text-2xl font-bold text-gray-900">{info.creditRatio}<span className="text-sm font-normal text-gray-600">倍</span></div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">時価総額</div>
            <div className="text-xl font-bold text-gray-900">{info.marketCap}<span className="text-sm font-normal text-gray-600">億円</span></div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">業種</div>
            <div className="text-xl font-semibold text-blue-600">{info.industry}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">単位</div>
            <div className="text-xl font-semibold text-gray-900">{info.unit}</div>
          </div>
        </div>
      </div>

      {info.earningsDate && (
        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="text-sm text-gray-500 mb-1">決算発表予定日</div>
          <div className="text-lg font-semibold text-gray-900">{info.earningsDate}</div>
        </div>
      )}
    </div>
  );
}
