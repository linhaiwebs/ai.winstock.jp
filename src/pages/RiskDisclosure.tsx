import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RiskDisclosure() {
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
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">リスク開示書面</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-6">最終更新日: 2025年10月21日</p>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-red-900 mb-3">重要なお知らせ</h2>
              <p className="text-red-800 leading-relaxed mb-3">
                株式投資には、投資元本を割り込むリスクがあります。
                本書面は、株式投資に伴う主なリスクについて説明するものです。
              </p>
              <p className="text-red-800 font-bold leading-relaxed">
                投資を行う際は、これらのリスクを十分に理解した上で、ご自身の判断と責任において行ってください。
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. 価格変動リスク</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                株価は、国内外の政治・経済情勢、企業の業績、市場の需給関係等、様々な要因により変動します。
              </p>
              <div className="bg-gray-50 rounded p-4 mb-3">
                <p className="font-semibold text-gray-900 mb-2">主な変動要因：</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>企業の業績変化</li>
                  <li>経営陣の交代や経営方針の変更</li>
                  <li>業界動向や競争環境の変化</li>
                  <li>金利、為替相場の変動</li>
                  <li>国内外の経済指標の発表</li>
                  <li>政治情勢や国際関係の変化</li>
                  <li>自然災害や感染症の流行</li>
                  <li>市場全体の需給バランス</li>
                </ul>
              </div>
              <p className="text-red-700 font-semibold leading-relaxed">
                これらの要因により、株価が大きく下落し、投資元本を大幅に割り込む可能性があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. 信用リスク（発行体リスク）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                株式を発行している企業の経営・財務状況の悪化により、以下のような事態が発生する可能性があります：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>配当金の減額または無配</li>
                <li>株価の大幅な下落</li>
                <li>上場廃止</li>
                <li>会社の倒産</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                特に、企業が倒産した場合、株式の価値は大幅に毀損され、投資資金の全額を失う可能性があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. 流動性リスク</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                市場における売買の状況により、以下のような事態が発生する可能性があります：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>希望する価格で売買できない</li>
                <li>希望する数量で売買できない</li>
                <li>売買自体ができない</li>
                <li>売買価格が大きく変動する</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                特に、売買高が少ない銘柄や、市場が混乱している局面では、
                流動性が著しく低下し、大きな損失を被る可能性があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. 為替変動リスク</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                外国株式や外貨建て資産に投資する場合、為替相場の変動により、
                円換算での投資価値が変動します。
              </p>
              <p className="text-gray-700 leading-relaxed">
                円高になった場合、外貨建て資産の円換算額が減少し、
                現地通貨ベースでは利益が出ていても、円ベースでは損失となる可能性があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. カントリーリスク</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                海外の株式に投資する場合、投資先の国や地域における以下のような事態により、
                投資価値が影響を受ける可能性があります：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>政治・経済情勢の変化</li>
                <li>外国為替規制の変更</li>
                <li>資本規制の導入</li>
                <li>税制の変更</li>
                <li>市場の閉鎖</li>
                <li>戦争、テロ、暴動等</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. レバレッジリスク</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                信用取引やデリバティブ取引等、レバレッジを利用した取引では、
                少額の資金で大きな取引が可能になる反面、以下のリスクがあります：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>損失が投資元本を上回る可能性がある</li>
                <li>追加証拠金（追証）の差し入れが必要になる場合がある</li>
                <li>相場の変動により強制決済される可能性がある</li>
              </ul>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-3">
                <p className="text-amber-900 font-semibold">
                  レバレッジ取引は、高度な知識と経験が必要です。
                  初心者の方は、十分に理解するまで利用を控えることをお勧めします。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. システムリスク</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                取引システムの障害、通信回線の障害等により、以下のような事態が発生する可能性があります：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>注文が執行されない</li>
                <li>注文の取消や訂正ができない</li>
                <li>約定結果が確認できない</li>
                <li>取引機会を逸失する</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. 過去の実績について</h2>
              <p className="text-red-700 font-bold leading-relaxed mb-3">
                過去の運用実績は、将来の運用成果を保証するものではありません。
              </p>
              <p className="text-gray-700 leading-relaxed">
                市場環境や企業の状況は常に変化しており、
                過去に良好な成績を収めた銘柄や戦略が、将来も同様の成果をあげるとは限りません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">9. AIによる分析の限界</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスが提供するAI分析は、過去のデータと統計的手法に基づくものです。
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>予測不可能な突発的事象には対応できません</li>
                <li>市場の構造的変化を即座に反映できない場合があります</li>
                <li>分析結果は参考情報であり、投資成果を保証するものではありません</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. 投資にあたっての留意事項</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>余裕資金で投資を行ってください</li>
                  <li>分散投資によりリスクを低減してください</li>
                  <li>長期的な視点で投資を行ってください</li>
                  <li>定期的にポートフォリオを見直してください</li>
                  <li>不明な点は、金融商品取引業者や専門家に相談してください</li>
                  <li>投資判断は、ご自身の責任において行ってください</li>
                </ul>
              </div>
            </section>

            <div className="bg-slate-100 rounded-lg p-6 mt-8">
              <h3 className="font-bold text-gray-900 mb-3">お問い合わせ</h3>
              <p className="text-sm text-gray-700">
                リスクに関するご質問や、投資についてのご相談は、
                証券会社等の金融商品取引業者にお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
