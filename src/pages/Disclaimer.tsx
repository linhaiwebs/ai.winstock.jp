import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">免責事項</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-6">最終更新日: 2025年10月21日</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
              <p className="text-red-900 font-bold mb-2">重要な注意事項</p>
              <p className="text-red-800 leading-relaxed">
                当サービスは情報提供のみを目的としており、投資助言や投資勧誘を行うものではありません。
                投資判断はご自身の責任において行ってください。
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. サービスの性質について</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                AI株式診断サービス（以下「当サービス」）は、AI技術を活用した株式情報の提供および分析ツールです。
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスは以下の業務には該当しません：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>投資助言業務</li>
                <li>投資一任業務</li>
                <li>金融商品仲介業務</li>
                <li>証券取引の勧誘行為</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                当サービス運営者は、金融商品取引業者（投資助言・代理業、投資運用業等）ではありません。
                金融商品取引法第29条の登録を受けた事業者ではないため、個別の投資助言を行うことはできません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. 情報の正確性について</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスで提供される情報は、信頼できると判断した情報源から取得していますが、
                その正確性、完全性、適時性、有用性について、いかなる保証も行いません。
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                AI分析結果は、過去のデータおよび統計的手法に基づくものであり、将来の投資成果を保証するものではありません。
                市場環境の変化により、分析結果と実際の結果が大きく異なる可能性があります。
              </p>
              <p className="text-gray-700 leading-relaxed">
                株価データ、財務データ等の情報は、データ提供元の都合により遅延、中断、または誤りが含まれる可能性があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. 投資リスクについて</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                <p className="text-amber-900 font-semibold mb-2">株式投資のリスク</p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  株式投資には以下のようなリスクが伴います：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>価格変動リスク:</strong> 株価は市場環境、企業業績、経済情勢等により変動し、投資元本を割り込む可能性があります</li>
                  <li><strong>信用リスク:</strong> 発行会社の経営・財務状況の変化により、投資価値が大きく減少する可能性があります</li>
                  <li><strong>流動性リスク:</strong> 市場環境により、希望する価格や数量で売買できない可能性があります</li>
                  <li><strong>為替リスク:</strong> 外国株式等に投資する場合、為替相場の変動により損失が発生する可能性があります</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                過去の運用実績は将来の運用成果を保証するものではありません。
                市場環境の変化により、予想外の損失が発生する可能性があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. 投資判断の責任</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスが提供する情報は、あくまでも参考情報として提供されるものです。
              </p>
              <p className="text-red-700 font-bold leading-relaxed mb-3">
                最終的な投資判断は、利用者ご自身の責任において行ってください。
              </p>
              <p className="text-gray-700 leading-relaxed">
                当サービスの利用により生じた損害（直接損害、間接損害、特別損害、付随的損害、結果的損害を含むがこれらに限られない）について、
                当社は一切の責任を負いません。ただし、当社の故意または重過失による場合はこの限りではありません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. サービスの可用性</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                当社は、当サービスの提供において、以下の事項について保証しません：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>サービスが中断されないこと</li>
                <li>サービスにエラーや不具合が発生しないこと</li>
                <li>サービスが常に最新の情報を提供すること</li>
                <li>サービスが全ての環境で正常に動作すること</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                システムメンテナンス、障害、その他の理由により、予告なくサービスを停止する場合があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. 外部リンクについて</h2>
              <p className="text-gray-700 leading-relaxed">
                当サービスから外部サイトへのリンクが含まれる場合がありますが、
                外部サイトの内容については当社は一切の責任を負いません。
                外部サイトの利用は、各サイトの利用規約に従ってください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. 専門家への相談</h2>
              <p className="text-gray-700 leading-relaxed">
                実際に投資を行う際は、証券会社等の金融商品取引業者、または税理士、弁護士等の専門家にご相談ください。
                特に、大きな金額の投資を行う場合や、税務上の取り扱いが不明な場合は、必ず専門家のアドバイスを受けることをお勧めします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. 本免責事項の変更</h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、必要に応じて本免責事項を変更することができます。
                変更後の免責事項は、当サービス上に掲載された時点から効力を生じるものとします。
              </p>
            </section>

            <div className="bg-slate-100 rounded-lg p-6 mt-8">
              <h3 className="font-bold text-gray-900 mb-3">お問い合わせ</h3>
              <p className="text-sm text-gray-700">
                本免責事項に関するご質問がございましたら、お問い合わせフォームよりご連絡ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
