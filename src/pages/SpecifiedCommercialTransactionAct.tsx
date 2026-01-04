import { ArrowLeft, FileText, Building, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SpecifiedCommercialTransactionAct() {
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
            <h1 className="text-3xl font-bold text-gray-900">特定商取引法に基づく表記</h1>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            特定商取引法（特定商取引に関する法律）に基づき、以下の通り表記いたします。
          </p>

          <div className="space-y-6">
            <section className="border-b border-gray-200 pb-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">販売業者情報</h2>
                  <dl className="space-y-3">
                    <div className="grid sm:grid-cols-3 gap-2">
                      <dt className="font-semibold text-gray-900">販売業者名</dt>
                      <dd className="sm:col-span-2 text-gray-700">AI株式診断サービス運営事業者</dd>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <dt className="font-semibold text-gray-900">運営責任者</dt>
                      <dd className="sm:col-span-2 text-gray-700">山田 太郎</dd>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <dt className="font-semibold text-gray-900">所在地</dt>
                      <dd className="sm:col-span-2 text-gray-700">
                        〒XXX-XXXX<br />
                        東京都XX区XX町X-X-X XXビルX階
                      </dd>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <dt className="font-semibold text-gray-900">設立</dt>
                      <dd className="sm:col-span-2 text-gray-700">2025年</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">連絡先</h2>
                  <dl className="space-y-3">
                    <div className="grid sm:grid-cols-3 gap-2">
                      <dt className="font-semibold text-gray-900">電話番号</dt>
                      <dd className="sm:col-span-2 text-gray-700">03-XXXX-XXXX</dd>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <dt className="font-semibold text-gray-900">メールアドレス</dt>
                      <dd className="sm:col-span-2 text-blue-600">ai.winstock.jp</dd>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <dt className="font-semibold text-gray-900">受付時間</dt>
                      <dd className="sm:col-span-2 text-gray-700">平日 9:00 - 18:00（土日祝日、年末年始を除く）</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">サービス内容</h2>
              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-3">提供サービス</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>AI技術を活用した株式情報の提供および分析サービス</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>株価データ、チャート、テクニカル指標の表示</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>AI分析レポートの生成と提供</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>投資情報の提供（情報提供のみ、投資助言には該当しません）</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">サービス料金</h2>
              <div className="bg-blue-50 rounded-lg p-5 border-2 border-blue-200">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">基本サービス</h3>
                      <p className="text-sm text-gray-700">
                        株価情報の閲覧、AI診断機能、レポートダウンロード
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-green-600">無料</p>
                    </div>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      現在、当サービスは基本機能を無料で提供しております。
                      今後、プレミアム機能を追加する場合は、事前にお知らせいたします。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">お支払い方法</h2>
              <div className="bg-slate-50 rounded-lg p-5">
                <p className="text-gray-700 leading-relaxed">
                  現在、有料サービスは提供しておりません。
                  今後、有料プランを導入する際は、以下の決済方法を予定しております。
                </p>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>クレジットカード決済（Visa、Mastercard、JCB、American Express等）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>銀行振込</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>コンビニ決済</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">サービス提供時期</h2>
              <div className="bg-slate-50 rounded-lg p-5">
                <p className="text-gray-700 leading-relaxed">
                  サービスはお申し込み後、即時ご利用いただけます。
                  AI診断結果の生成には、通常数秒から数十秒程度のお時間をいただきます。
                </p>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">返品・キャンセルについて</h2>
              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-3">無料サービスについて</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  現在提供している無料サービスについては、
                  いつでもご利用を停止いただけます。
                </p>
                <h3 className="font-bold text-gray-900 mb-3">今後提供予定の有料サービスについて</h3>
                <p className="text-gray-700 leading-relaxed">
                  デジタルコンテンツの性質上、原則として返品・返金はお受けできません。
                  ただし、以下の場合は返金対応を検討いたします。
                </p>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>システムの不具合により、サービスが正常に提供されなかった場合</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>当社の責に帰すべき事由により、サービス提供が不可能となった場合</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">個人情報の取り扱い</h2>
              <div className="bg-slate-50 rounded-lg p-5">
                <p className="text-gray-700 leading-relaxed mb-3">
                  お客様の個人情報は、個人情報保護法に基づき適切に管理いたします。
                  詳細は
                  <Link to="/privacy" className="text-blue-600 hover:underline font-semibold mx-1">
                    プライバシーポリシー
                  </Link>
                  をご確認ください。
                </p>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">免責事項</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
                <p className="text-amber-900 font-semibold mb-3">重要なお知らせ</p>
                <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
                  <p>
                    当サービスは、AI技術を活用した株式情報の提供および分析ツールであり、
                    投資助言業務、投資一任業務、金融商品仲介業務には該当しません。
                  </p>
                  <p>
                    提供される情報は参考情報としてご活用ください。
                    株式投資には価格変動リスク、信用リスク、流動性リスク等が伴い、
                    投資元本を割り込む可能性があります。
                  </p>
                  <p>
                    最終的な投資判断は、必ずご自身の責任において行ってください。
                    当サービスの利用により生じたいかなる損害についても、
                    当社は一切の責任を負いません。
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">お問い合わせ</h2>
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  特定商取引法に関するご質問、その他お問い合わせは、
                  以下の方法でご連絡ください。
                </p>
                <div className="flex items-start gap-3 mb-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">メール</p>
                    <p className="text-blue-600">ai.winstock.jp</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">電話</p>
                    <p className="text-gray-700">03-XXXX-XXXX（平日 9:00 - 18:00）</p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  お問い合わせフォームへ
                </Link>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              最終更新日: 2025年1月15日
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
