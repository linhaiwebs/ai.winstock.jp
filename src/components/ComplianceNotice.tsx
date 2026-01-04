import { AlertTriangle, Info } from 'lucide-react';

export default function ComplianceNotice() {
  return (
    <div className="w-full bg-gradient-to-r from-dark-card to-dark-secondary border-b-2 border-accent-red shadow-lg">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-3">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-gray-300 leading-relaxed">
              <span className="font-bold text-yellow-400">【金融商品取引法に基づく表示】</span>
              本サービスは情報提供のみを目的とし、投資助言・勧誘ではありません。株式投資にはリスクが伴い、元本割れの可能性があります。最終的な投資判断はご自身の責任で行ってください。当サービスは金融商品取引業者ではありません。
            </p>
          </div>
          <Info className="w-4 h-4 text-gray-500 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
