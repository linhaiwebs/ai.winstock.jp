import { ArrowLeft, HelpCircle, Book, MessageCircle, Mail, FileText, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Support() {
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
              <HelpCircle className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">サポート</h1>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            AI株式診断サービスのサポートページです。
            よくある質問の確認、トラブルシューティング、お問い合わせ方法などをご案内いたします。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link
              to="/faq"
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-200 p-3 rounded-lg group-hover:bg-blue-300 transition-colors">
                  <Book className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">よくある質問（FAQ）</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    サービスに関してよく寄せられる質問とその回答をまとめています。
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/contact"
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-200 p-3 rounded-lg group-hover:bg-green-300 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">お問い合わせ</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    FAQで解決しない問題やご質問がありましたら、お気軽にお問い合わせください。
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              トラブルシューティング
            </h2>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <h3 className="font-bold text-gray-900 mb-2">株価データが表示されない</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>ブラウザのキャッシュをクリアして、ページを再読み込みしてください</li>
                  <li>URLに正しい株式コードが含まれているか確認してください</li>
                  <li>市場の開場時間外の場合、データ更新に遅延が生じる場合があります</li>
                  <li>インターネット接続が安定しているか確認してください</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <h3 className="font-bold text-gray-900 mb-2">AI診断が完了しない</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>ネットワーク接続が安定しているか確認してください</li>
                  <li>ページを再読み込みして、もう一度診断を実行してください</li>
                  <li>ブラウザの開発者コンソールでエラーメッセージを確認してください</li>
                  <li>問題が続く場合は、お問い合わせフォームよりご連絡ください</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <h3 className="font-bold text-gray-900 mb-2">チャートが表示されない</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>JavaScriptが有効になっているか確認してください</li>
                  <li>広告ブロッカーを一時的に無効にしてみてください</li>
                  <li>ブラウザを最新版にアップデートしてください</li>
                  <li>別のブラウザで動作を確認してください</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <h3 className="font-bold text-gray-900 mb-2">レポートがダウンロードできない</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>ブラウザのポップアップブロック設定を確認してください</li>
                  <li>ダウンロード権限が許可されているか確認してください</li>
                  <li>十分なストレージ容量があるか確認してください</li>
                  <li>別のブラウザで試してみてください</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              ヘルプガイド
            </h2>

            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-2">サービスの使い方</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  1. URLパラメータに株式コードを指定してページにアクセス
                  <br />
                  2. 株価情報とチャートを確認
                  <br />
                  3. 「AI株式診断を開始する」ボタンをクリック
                  <br />
                  4. AI分析結果を確認
                  <br />
                  5. 必要に応じてレポートをダウンロード
                </p>
              </div>

              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-2">推奨環境</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  <strong>ブラウザ：</strong>
                </p>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 ml-4">
                  <li>Google Chrome（最新版）</li>
                  <li>Firefox（最新版）</li>
                  <li>Safari（最新版）</li>
                  <li>Microsoft Edge（最新版）</li>
                </ul>
                <p className="text-sm text-gray-700 leading-relaxed mt-3">
                  <strong>デバイス：</strong> PC、タブレット、スマートフォン対応
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-2">データについて</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  株価データは準リアルタイムで更新されます。データ提供元の都合により、
                  若干の遅延が発生する場合があります。詳細は
                  <Link to="/disclaimer" className="text-blue-600 hover:underline font-semibold ml-1">
                    免責事項
                  </Link>
                  をご確認ください。
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-600" />
              サポートへのお問い合わせ
            </h2>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                上記の情報で問題が解決しない場合は、お問い合わせフォームよりご連絡ください。
                できる限り早く対応させていただきます。
              </p>

              <div className="bg-white rounded-lg p-4 mb-4">
                <h3 className="font-bold text-gray-900 mb-2">サポート受付時間</h3>
                <p className="text-sm text-gray-700">
                  平日 9:00 - 18:00（土日祝日、年末年始を除く）
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
              >
                <Mail className="w-5 h-5" />
                お問い合わせフォームへ
              </Link>
            </div>
          </section>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              重要なお知らせ
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              当サービスは金融商品取引業者ではないため、個別の投資助言を行うことはできません。
              投資に関する具体的なご相談は、証券会社等の金融商品取引業者にお問い合わせください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
