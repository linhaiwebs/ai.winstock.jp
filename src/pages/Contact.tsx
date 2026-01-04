import { ArrowLeft, Mail, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
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
              <Mail className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">お問い合わせ</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              AI株式診断サービスをご利用いただき、誠にありがとうございます。
              ご質問、ご要望、不具合のご報告など、お気軽にお問い合わせください。
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">受付時間</h2>
              <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">平日 9:00 - 18:00</p>
                  <p className="text-sm text-gray-600">
                    ※土日祝日、年末年始は休業とさせていただきます<br />
                    ※お問い合わせ内容により、回答までに数日かかる場合がございます
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">お問い合わせフォーム</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    お名前 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    メールアドレス <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ai.winstock.jp"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    件名 <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    <option value="service">サービス内容について</option>
                    <option value="technical">技術的な問題</option>
                    <option value="billing">料金について</option>
                    <option value="account">アカウントについて</option>
                    <option value="feature">機能リクエスト</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    お問い合わせ内容 <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="お問い合わせ内容を詳しくご記入ください"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      <a href="/privacy" className="text-blue-600 hover:underline">プライバシーポリシー</a>
                      に同意します <span className="text-red-600">*</span>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  送信する
                </button>
              </form>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>注意：</strong> このフォームは現在デモ版です。実際の送信機能は実装されていません。
                  本番環境では、適切なバックエンド処理を実装する必要があります。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">よくあるお問い合わせ</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                よくあるご質問については、
                <a href="/faq" className="text-blue-600 hover:underline font-semibold">FAQ（よくある質問）</a>
                のページもご参照ください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">投資に関するご相談について</h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-900 font-semibold mb-2">重要なお知らせ</p>
                <p className="text-red-800 leading-relaxed">
                  当サービスは金融商品取引業者ではないため、個別の投資助言を行うことはできません。
                  投資に関する具体的なご相談は、証券会社等の金融商品取引業者にお問い合わせください。
                </p>
              </div>
            </section>

            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                電話でのお問い合わせ
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                現在、電話でのお問い合わせは受け付けておりません。
                お問い合わせフォームをご利用ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
