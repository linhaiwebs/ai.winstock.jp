import { ArrowLeft, Building, Target, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
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
              <Building className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">運営会社情報</h1>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">AI株式診断サービスについて</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                AI株式診断サービスは、最新のAI技術を活用して株式市場の情報を分析し、
                投資家の皆様に有益な情報を提供することを目的としたサービスです。
              </p>
              <p className="text-gray-700 leading-relaxed">
                私たちは、テクノロジーの力で投資情報の民主化を実現し、
                より多くの方々が適切な情報に基づいて投資判断を行える環境を提供することを目指しています。
              </p>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">ミッション</h2>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-800 font-semibold mb-3">
                  「AI技術で投資情報をもっと身近に、もっと分かりやすく」
                </p>
                <p className="text-gray-700 leading-relaxed">
                  私たちは、複雑な株式市場の情報をAI技術により分かりやすく分析し、
                  投資家の皆様がより良い投資判断を行えるよう支援することを使命としています。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">サービスの特徴</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-2">AI分析技術</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    最新の機械学習アルゴリズムを使用し、
                    大量の市場データから有用な情報を抽出します。
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-2">使いやすいUI</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    直感的なインターフェースで、初心者からプロまで
                    誰でも簡単に利用できます。
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                  <h3 className="font-bold text-gray-900 mb-2">準リアルタイム</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    市場データを準リアルタイムで更新し、
                    常に最新の情報を提供します。
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-2">無料で利用可能</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    基本機能は無料でご利用いただけます。
                    投資情報へのアクセスを民主化します。
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">私たちの価値観</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-gray-900">透明性</strong>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      AI分析の手法や限界について、明確に説明します。
                      利用者の皆様が正しく情報を理解できるよう努めます。
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-gray-900">中立性</strong>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      特定の銘柄を推奨したり、売買を勧誘することはありません。
                      客観的な情報提供に徹します。
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-gray-900">継続的改善</strong>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      利用者の皆様からのフィードバックを真摯に受け止め、
                      サービスの改善に努めます。
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-gray-900">コンプライアンス</strong>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      金融商品取引法をはじめとする関連法規を遵守し、
                      適切なサービス運営を行います。
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">会社概要</h2>
              <div className="bg-slate-50 rounded-lg p-6">
                <dl className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <dt className="font-semibold text-gray-900 w-32 flex-shrink-0">サービス名</dt>
                    <dd className="text-gray-700">AI株式診断サービス</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <dt className="font-semibold text-gray-900 w-32 flex-shrink-0">設立</dt>
                    <dd className="text-gray-700">2025年</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <dt className="font-semibold text-gray-900 w-32 flex-shrink-0">事業内容</dt>
                    <dd className="text-gray-700">
                      株式市場情報の分析および提供<br />
                      AI技術を活用した投資情報サービスの開発・運営
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <dt className="font-semibold text-gray-900 w-32 flex-shrink-0">所在地</dt>
                    <dd className="text-gray-700">東京都（詳細は非公開）</dd>
                  </div>
                </dl>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">重要なお知らせ</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                <p className="text-amber-900 font-semibold mb-2">金融商品取引業者ではありません</p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  当サービスは、金融商品取引法第29条の登録を受けた金融商品取引業者ではありません。
                  投資助言業務、投資一任業務、金融商品仲介業務は行いません。
                  当サービスが提供する情報は、あくまで参考情報としてご活用ください。
                </p>
              </div>
            </section>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">お問い合わせ</h3>
              <p className="text-sm text-gray-700 mb-3">
                サービスに関するご質問、ご意見、お問い合わせは、
                お問い合わせフォームよりご連絡ください。
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                お問い合わせフォームへ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
