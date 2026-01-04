import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
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
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">利用規約</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-6">最終更新日: 2025年10月21日</p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第1条（適用）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                本規約は、AI株式診断サービス（以下「当サービス」といいます）の利用に関する条件を、当サービスを利用する全ての方（以下「利用者」といいます）と当サービス運営者（以下「当社」といいます）との間で定めるものです。
              </p>
              <p className="text-gray-700 leading-relaxed">
                利用者は、当サービスを利用することにより、本規約の全ての内容に同意したものとみなされます。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第2条（サービスの内容）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスは、AI技術を活用して株式市場の情報を分析し、利用者に提供する情報提供サービスです。
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスは以下の機能を提供します：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>株式銘柄の基本情報の表示</li>
                <li>株価推移のグラフ表示</li>
                <li>AIによる株式分析レポートの生成</li>
                <li>市場データの集計および統計情報の提供</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第3条（利用上の注意事項）</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                <p className="text-gray-800 font-semibold mb-2">重要な注意事項</p>
                <p className="text-gray-700 leading-relaxed">
                  当サービスは情報提供のみを目的としており、投資助言や投資勧誘を行うものではありません。
                  当サービスが提供する情報は、投資判断の参考情報として提供されるものであり、投資成果を保証するものではありません。
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                利用者は、自己の責任において投資判断を行うものとし、当サービスの利用により生じた損害について、当社は一切の責任を負いません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第4条（禁止事項）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                利用者は、当サービスの利用にあたり、以下の行為を行ってはなりません：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当サービスの運営を妨害する行為</li>
                <li>他の利用者または第三者の権利を侵害する行為</li>
                <li>虚偽の情報を登録する行為</li>
                <li>当サービスの情報を商業目的で利用する行為</li>
                <li>不正アクセスまたはこれを試みる行為</li>
                <li>当サービスのシステムに過度な負荷をかける行為</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第5条（知的財産権）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスに含まれるコンテンツ、テキスト、画像、プログラム等の著作権その他の知的財産権は、当社または当社にライセンスを許諾している者に帰属します。
              </p>
              <p className="text-gray-700 leading-relaxed">
                利用者は、当社の事前の書面による承諾なく、これらを複製、転載、配布、改変等することはできません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第6条（免責事項）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                当社は、当サービスの内容、品質、正確性、完全性、有用性について、いかなる保証も行いません。
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスの利用により利用者に生じた損害について、当社は一切の責任を負いません。ただし、当社の故意または重過失による場合はこの限りではありません。
              </p>
              <p className="text-gray-700 leading-relaxed">
                当サービスの提供の遅延、中断、停止、データの消失等について、当社は一切の責任を負いません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第7条（サービスの変更・停止）</h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、利用者への事前の通知なく、当サービスの内容を変更し、または当サービスの提供を停止することができるものとします。
                これにより利用者に生じた損害について、当社は一切の責任を負いません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第8条（個人情報の取扱い）</h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、利用者の個人情報を、当社が別途定めるプライバシーポリシーに従って適切に取り扱います。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第9条（規約の変更）</h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、必要に応じて本規約を変更することができます。変更後の規約は、当サービス上に掲載された時点から効力を生じるものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第10条（準拠法および管轄裁判所）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                本規約の解釈にあたっては、日本法を準拠法とします。
              </p>
              <p className="text-gray-700 leading-relaxed">
                当サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄裁判所とします。
              </p>
            </section>

            <div className="bg-slate-100 rounded-lg p-6 mt-8">
              <h3 className="font-bold text-gray-900 mb-3">お問い合わせ</h3>
              <p className="text-sm text-gray-700">
                本規約に関するご質問やご不明な点がございましたら、お問い合わせフォームよりご連絡ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
