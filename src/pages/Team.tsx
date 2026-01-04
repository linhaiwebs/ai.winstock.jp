import { ArrowLeft, Users, Award, Code, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Team() {
  const teamMembers = [
    {
      name: '山田 太郎',
      role: 'CEO / 創業者',
      icon: Award,
      color: 'blue',
      description: '金融業界で15年の経験を持つベテラン。投資情報の民主化を目指してサービスを創業。',
      expertise: ['経営戦略', '金融市場分析', '事業開発']
    },
    {
      name: '佐藤 花子',
      role: 'CTO / 技術責任者',
      icon: Code,
      color: 'purple',
      description: 'AI・機械学習の専門家。大手テック企業でのキャリアを経て参画。',
      expertise: ['AI/ML開発', 'システムアーキテクチャ', 'データサイエンス']
    },
    {
      name: '鈴木 一郎',
      role: '金融アナリスト',
      icon: TrendingUp,
      color: 'green',
      description: '証券アナリスト資格保有。市場分析とリサーチを担当。',
      expertise: ['株式市場分析', 'テクニカル分析', 'ファンダメンタル分析']
    },
    {
      name: '田中 美咲',
      role: 'コンプライアンス責任者',
      icon: Shield,
      color: 'orange',
      description: '金融法務のスペシャリスト。法令遵守とリスク管理を統括。',
      expertise: ['金融法規制', 'リスク管理', 'コンプライアンス']
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; icon: string; badge: string } } = {
      blue: {
        bg: 'from-blue-50 to-blue-100',
        border: 'border-blue-200',
        icon: 'bg-blue-200 text-blue-700',
        badge: 'bg-blue-600'
      },
      purple: {
        bg: 'from-purple-50 to-purple-100',
        border: 'border-purple-200',
        icon: 'bg-purple-200 text-purple-700',
        badge: 'bg-purple-600'
      },
      green: {
        bg: 'from-green-50 to-green-100',
        border: 'border-green-200',
        icon: 'bg-green-200 text-green-700',
        badge: 'bg-green-600'
      },
      orange: {
        bg: 'from-orange-50 to-orange-100',
        border: 'border-orange-200',
        icon: 'bg-orange-200 text-orange-700',
        badge: 'bg-orange-600'
      }
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
              <Users className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">チーム紹介</h1>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              AI株式診断サービスは、金融、テクノロジー、法務の専門家によって運営されています。
              それぞれの分野のプロフェッショナルが集まり、
              投資家の皆様に価値ある情報を提供することを目指しています。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {teamMembers.map((member, index) => {
              const colors = getColorClasses(member.color);
              const Icon = member.icon;

              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${colors.bg} rounded-xl p-6 border-2 ${colors.border} hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${colors.icon} p-3 rounded-lg flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <div className={`inline-block ${colors.badge} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        {member.role}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {member.description}
                  </p>

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">専門分野</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">私たちのミッション</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
              <p className="text-gray-800 font-semibold mb-3 text-lg">
                「AI技術で投資情報をもっと身近に、もっと分かりやすく」
              </p>
              <p className="text-gray-700 leading-relaxed">
                私たちは、複雑な株式市場の情報をAI技術により分かりやすく分析し、
                投資家の皆様がより良い投資判断を行えるよう支援することを使命としています。
                テクノロジーの力で投資情報の民主化を実現し、
                より多くの方々が適切な情報に基づいて投資判断を行える環境を提供します。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">チームの価値観</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <h3 className="font-bold text-gray-900 mb-2">透明性</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  AI分析の手法や限界について明確に説明し、
                  利用者の皆様が正しく情報を理解できるよう努めます。
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <h3 className="font-bold text-gray-900 mb-2">中立性</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  特定の銘柄を推奨したり、売買を勧誘することはありません。
                  客観的な情報提供に徹します。
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <h3 className="font-bold text-gray-900 mb-2">継続的改善</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  利用者の皆様からのフィードバックを真摯に受け止め、
                  サービスの改善に努めます。
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <h3 className="font-bold text-gray-900 mb-2">コンプライアンス</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  金融商品取引法をはじめとする関連法規を遵守し、
                  適切なサービス運営を行います。
                </p>
              </div>
            </div>
          </section>

          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <h3 className="font-bold text-gray-900 mb-3">採用情報</h3>
            <p className="text-sm text-gray-700 mb-4">
              AI株式診断サービスでは、一緒に働く仲間を募集しています。
              金融、テクノロジー、データサイエンスなど、様々な分野の専門家を求めています。
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              採用情報を見る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
