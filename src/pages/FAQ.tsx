import { ArrowLeft, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'サービスについて',
      questions: [
        {
          q: 'AI株式診断サービスとは何ですか？',
          a: 'AI技術を活用して株式市場の情報を分析し、銘柄の基本情報、株価推移、AI分析レポート等を提供する情報サービスです。投資判断の参考情報として活用いただけます。'
        },
        {
          q: '無料で利用できますか？',
          a: '基本的な株価情報の閲覧とAI診断機能は無料でご利用いただけます。今後、プレミアム機能を追加する際は、事前にお知らせいたします。'
        },
        {
          q: '会員登録は必要ですか？',
          a: '現在のバージョンでは会員登録なしでご利用いただけます。ただし、今後機能拡張に伴い、一部機能で会員登録が必要になる場合があります。'
        }
      ]
    },
    {
      category: 'AI診断について',
      questions: [
        {
          q: 'AI診断の精度はどのくらいですか？',
          a: 'AI診断は過去のデータと統計的手法に基づいて分析を行いますが、将来の株価を正確に予測するものではありません。あくまで参考情報としてご活用ください。'
        },
        {
          q: 'AI診断の結果に基づいて投資しても大丈夫ですか？',
          a: 'AI診断結果は参考情報です。投資判断は必ずご自身の責任で行ってください。当サービスは投資助言業ではなく、特定の銘柄の売買を推奨するものではありません。'
        },
        {
          q: 'どのような情報を基に分析していますか？',
          a: '株価データ、出来高、各種テクニカル指標、財務情報等の公開情報を基に分析しています。ただし、突発的なニュースや市場環境の急変には対応できない場合があります。'
        }
      ]
    },
    {
      category: 'データについて',
      questions: [
        {
          q: '株価データはリアルタイムですか？',
          a: '株価データは準リアルタイムで更新されます。データ提供元の都合により、若干の遅延が発生する場合があります。'
        },
        {
          q: 'どの市場の銘柄を扱っていますか？',
          a: '現在は日本の主要市場（東証、名証等）の銘柄を扱っています。今後、対応市場を拡大する予定です。'
        },
        {
          q: 'データの更新頻度はどのくらいですか？',
          a: '市場開場中は数分ごとに更新されます。詳細な更新間隔はデータ提供元の仕様に依存します。'
        }
      ]
    },
    {
      category: '技術的な問題',
      questions: [
        {
          q: 'サービスが正常に動作しません',
          a: 'ブラウザのキャッシュをクリアし、ページを再読み込みしてください。それでも解決しない場合は、お問い合わせフォームよりご連絡ください。'
        },
        {
          q: '対応ブラウザを教えてください',
          a: 'Google Chrome、Firefox、Safari、Microsoft Edgeの最新版を推奨しています。古いブラウザでは一部機能が正常に動作しない場合があります。'
        },
        {
          q: 'スマートフォンでも利用できますか？',
          a: 'はい、レスポンシブデザインに対応しており、スマートフォンやタブレットでもご利用いただけます。'
        }
      ]
    },
    {
      category: 'セキュリティ・プライバシー',
      questions: [
        {
          q: '個人情報は安全に管理されていますか？',
          a: '当サービスは個人情報保護法に基づき、適切に管理しています。詳細はプライバシーポリシーをご確認ください。'
        },
        {
          q: 'Cookieは使用していますか？',
          a: 'はい、サービスの利便性向上のためCookieを使用しています。また、Google AdSenseによる広告配信のためにもCookieが使用されます。'
        },
        {
          q: '閲覧履歴は保存されますか？',
          a: 'サービス改善のため、アクセスログや利用統計を匿名で収集しています。個人を特定できる形での保存は行いません。'
        }
      ]
    },
    {
      category: '投資リスクについて',
      questions: [
        {
          q: '株式投資にはどのようなリスクがありますか？',
          a: '価格変動リスク、信用リスク、流動性リスク等があり、投資元本を割り込む可能性があります。詳細はリスク開示書面をご確認ください。'
        },
        {
          q: '初心者でも投資を始められますか？',
          a: '投資を始める前に、基礎知識を学び、リスクを十分に理解することが重要です。証券会社の初心者向けセミナー等の活用をお勧めします。'
        },
        {
          q: '損失が出た場合、補償はありますか？',
          a: '投資判断はご自身の責任で行っていただくものであり、当サービスは投資による損失の補償は一切行いません。'
        }
      ]
    },
    {
      category: '法規制について',
      questions: [
        {
          q: 'このサービスは金融商品取引業者ですか？',
          a: 'いいえ、当サービスは情報提供のみを行うものであり、金融商品取引業者ではありません。投資助言業務や金融商品仲介業務は行いません。'
        },
        {
          q: '投資助言を受けることはできますか？',
          a: '当サービスは個別の投資助言を行うことはできません。投資相談が必要な場合は、登録投資助言業者や証券会社にご相談ください。'
        }
      ]
    }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">よくある質問（FAQ）</h1>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            AI株式診断サービスに関してよくお問い合わせいただく質問をまとめました。
            こちらで解決しない場合は、お問い合わせフォームよりご連絡ください。
          </p>

          <div className="space-y-6">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h2 className="text-xl font-bold text-blue-700 mb-4">{category.category}</h2>
                <div className="space-y-3">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={faqIndex}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full px-4 py-3 flex items-start justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                        >
                          <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 py-3 bg-white">
                            <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <h3 className="font-bold text-gray-900 mb-3">お問い合わせ</h3>
            <p className="text-sm text-gray-700 mb-3">
              上記で解決しない質問やご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              お問い合わせフォームへ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
