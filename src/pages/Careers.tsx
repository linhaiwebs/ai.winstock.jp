import { ArrowLeft, Briefcase, Heart, Zap, Users, Target, TrendingUp, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Careers() {
  const positions = [
    {
      title: 'フロントエンドエンジニア',
      type: '正社員',
      location: '東京',
      description: 'React/TypeScriptを使用したWebアプリケーション開発',
      requirements: [
        'React/TypeScriptの実務経験3年以上',
        'レスポンシブデザインの実装経験',
        'UI/UXに対する深い理解',
        'Git/GitHubを使ったチーム開発経験'
      ]
    },
    {
      title: 'バックエンドエンジニア',
      type: '正社員',
      location: '東京/リモート',
      description: 'Node.js/Pythonを使用したAPI開発とデータ処理',
      requirements: [
        'Node.jsまたはPythonの実務経験3年以上',
        'RESTful API設計・開発経験',
        'データベース設計・運用経験',
        'AWS等のクラウドサービス利用経験'
      ]
    },
    {
      title: 'データサイエンティスト',
      type: '正社員',
      location: '東京',
      description: '機械学習モデルの開発と金融データ分析',
      requirements: [
        'Python/R等を使ったデータ分析経験',
        '機械学習・統計学の知識',
        '金融データの取り扱い経験歓迎',
        '論文執筆またはカンファレンス発表経験歓迎'
      ]
    },
    {
      title: '金融アナリスト',
      type: '正社員/契約社員',
      location: '東京',
      description: '株式市場の分析とレポート作成',
      requirements: [
        '証券アナリスト資格または同等の知識',
        '金融機関での実務経験3年以上',
        'テクニカル分析・ファンダメンタル分析の知識',
        '日本語・英語でのレポート作成能力'
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: '充実した福利厚生',
      description: '健康保険、厚生年金、雇用保険、労災保険完備。書籍購入費補助、資格取得支援制度あり。',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'フレキシブルな働き方',
      description: 'フレックスタイム制度、リモートワーク可能。ワークライフバランスを重視した環境。',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'チームワーク',
      description: '経験豊富なメンバーと協力し、切磋琢磨できる環境。定期的な勉強会・交流会を実施。',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'キャリア成長',
      description: '最新技術に触れる機会が豊富。スキルアップを支援し、キャリアパスを一緒に考えます。',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; icon: string } } = {
      red: { bg: 'from-red-50 to-red-100', icon: 'bg-red-200 text-red-700' },
      blue: { bg: 'from-blue-50 to-blue-100', icon: 'bg-blue-200 text-blue-700' },
      green: { bg: 'from-green-50 to-green-100', icon: 'bg-green-200 text-green-700' },
      purple: { bg: 'from-purple-50 to-purple-100', icon: 'bg-purple-200 text-purple-700' }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
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
              <Briefcase className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">採用情報</h1>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              AI株式診断サービスでは、一緒に成長していける仲間を募集しています。
              私たちは、AI技術で投資情報の民主化を実現するというミッションに共感し、
              挑戦を楽しめる方をお待ちしています。
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
              <p className="text-gray-800 font-semibold text-lg mb-2 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                私たちのビジョン
              </p>
              <p className="text-gray-700 leading-relaxed">
                テクノロジーの力で投資情報をすべての人に届け、
                誰もが適切な情報に基づいて投資判断を行える世界を創造します。
              </p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">働く環境と福利厚生</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => {
                const colors = getColorClasses(benefit.color);
                const Icon = benefit.icon;

                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${colors.bg} rounded-lg p-5 border border-gray-200`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`${colors.icon} p-2 rounded-lg flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">募集職種</h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200 hover:border-blue-300 transition-all hover:shadow-md"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{position.title}</h3>
                      <p className="text-gray-700 mb-3">{position.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {position.type}
                      </span>
                      <span className="bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {position.location}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">必須要件・歓迎スキル</h4>
                    <ul className="space-y-1">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">選考フロー</h2>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">書類選考</h4>
                    <p className="text-sm text-gray-700">
                      履歴書・職務経歴書をご提出いただきます（1週間程度）
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">一次面接</h4>
                    <p className="text-sm text-gray-700">
                      オンラインまたは対面での面接（スキル・経験の確認）
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">技術課題／実技試験</h4>
                    <p className="text-sm text-gray-700">
                      職種に応じた課題またはケーススタディ（エンジニア・データサイエンティスト職）
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">最終面接</h4>
                    <p className="text-sm text-gray-700">
                      役員面接（カルチャーフィット・志望動機の確認）
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    5
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">内定・オファー面談</h4>
                    <p className="text-sm text-gray-700">
                      条件面談・入社日の調整
                    </p>
                  </div>
                </li>
              </ol>
              <p className="text-sm text-gray-600 mt-4 pl-11">
                ※選考期間は通常2〜4週間程度です。職種や状況により変動する場合があります。
              </p>
            </div>
          </section>

          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              応募方法
            </h3>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              ご興味をお持ちいただけましたら、お問い合わせフォームより「件名：採用応募」として、
              以下の情報をお送りください。
            </p>
            <ul className="text-sm text-gray-700 mb-4 space-y-1 list-disc list-inside">
              <li>応募職種</li>
              <li>お名前</li>
              <li>メールアドレス</li>
              <li>履歴書・職務経歴書（PDF形式）</li>
              <li>ポートフォリオ（エンジニア職の場合）</li>
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
            >
              <Mail className="w-5 h-5" />
              お問い合わせフォームへ
            </Link>
          </div>

          <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>注意：</strong> 現在、採用活動は準備段階です。
              今後、本格的な募集を開始する際は、本ページおよびプレスリリースにてお知らせいたします。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
