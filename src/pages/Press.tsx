import { ArrowLeft, Newspaper, Calendar, ExternalLink, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Press() {
  const pressReleases = [
    {
      date: '2025年1月15日',
      title: 'AI株式診断サービス、正式版をリリース',
      summary: '最新のAI技術を活用した株式診断サービスの正式版を公開いたしました。無料でご利用いただけます。',
      category: 'サービス'
    },
    {
      date: '2025年1月10日',
      title: '株価データ提供範囲を拡大、全上場銘柄に対応',
      summary: '日本の主要市場の全上場銘柄に対応し、より幅広い銘柄の分析が可能になりました。',
      category: '機能追加'
    },
    {
      date: '2024年12月20日',
      title: 'ベータ版リリースのお知らせ',
      summary: 'AI株式診断サービスのベータ版を公開し、一般ユーザー向けのテストを開始いたしました。',
      category: 'サービス'
    },
    {
      date: '2024年12月1日',
      title: 'AI株式診断サービス開発開始のお知らせ',
      summary: '投資情報の民主化を目指し、AIを活用した株式診断サービスの開発を開始いたしました。',
      category: '企業'
    }
  ];

  const mediaKits = [
    {
      title: '会社概要',
      description: 'サービスの概要、ミッション、ビジョンなど',
      format: 'PDF'
    },
    {
      title: 'ロゴ素材',
      description: 'ロゴデータ（PNG、SVG形式）',
      format: 'ZIP'
    },
    {
      title: 'サービス紹介資料',
      description: '機能説明、利用方法など',
      format: 'PDF'
    }
  ];

  const mediaContact = {
    department: '広報担当',
    email: 'ai.winstock.jp',
    phone: '03-XXXX-XXXX',
    hours: '平日 9:00 - 18:00'
  };

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
              <Newspaper className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">プレスリリース</h1>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            AI株式診断サービスに関するプレスリリース、メディア掲載情報、
            ニュースなどを掲載しています。
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">最新のプレスリリース</h2>
            <div className="space-y-4">
              {pressReleases.map((release, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200 hover:border-blue-300 transition-all hover:shadow-md"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-600">{release.date}</span>
                    </div>
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {release.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{release.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {release.summary}
                  </p>
                  <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold">
                    詳細を見る <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">メディア掲載</h2>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                現在、メディア掲載情報はありません。
                今後、掲載があり次第、こちらに掲載いたします。
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>メディア関係者の方へ：</strong>
                  取材のご依頼、サービスに関するお問い合わせは、下記のメディア窓口までご連絡ください。
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">メディアキット</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              報道関係者向けの資料をご用意しております。
              ダウンロードしてご利用ください。
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {mediaKits.map((kit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{kit.title}</h3>
                    <span className="bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {kit.format}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{kit.description}</p>
                  <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold">
                    <Download className="w-4 h-4" />
                    ダウンロード
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>注意：</strong> メディアキットのダウンロード機能は現在準備中です。
                資料が必要な場合は、メディア窓口までお問い合わせください。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">メディア窓口</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                取材のご依頼、プレスリリースに関するお問い合わせは、
                以下の窓口までご連絡ください。
              </p>
              <div className="bg-white rounded-lg p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900 w-24 flex-shrink-0">部署：</span>
                  <span className="text-gray-700">{mediaContact.department}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900 w-24 flex-shrink-0">Email：</span>
                  <span className="text-blue-600">{mediaContact.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900 w-24 flex-shrink-0">電話：</span>
                  <span className="text-gray-700">{mediaContact.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900 w-24 flex-shrink-0">受付時間：</span>
                  <span className="text-gray-700">{mediaContact.hours}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                ※土日祝日、年末年始を除く。お問い合わせ内容により、
                回答までに数日かかる場合がございます。
              </p>
            </div>
          </section>

          <div className="bg-slate-100 rounded-lg p-6 border border-slate-200">
            <h3 className="font-bold text-gray-900 mb-3">免責事項</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              本プレスリリースに記載された情報は、発表日現在のものです。
              発表日以降の業務上の理由、諸般の事情により、
              内容が変更される場合がありますので、あらかじめご了承ください。
              また、本プレスリリースに記載されている内容について、
              当社は一切の責任を負いません。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
