import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Scale, FileText, Mail, ExternalLink, ChevronLeft, ChevronRight, Info, Phone, Building } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentSlide, setCurrentSlide] = useState(0);

  const legalDisclosures = [
    {
      title: '【サービスの性質】',
      content: '本サービスは、AI技術を活用した株式情報の提供および分析ツールです。',
      highlight: '投資助言業務、投資一任業務、金融商品仲介業務には該当せず、特定の金融商品の売買を推奨・勧誘するものではありません。',
      borderColor: 'border-amber-500'
    },
    {
      title: '【投資リスクに関する警告】',
      content: '株式投資には価格変動リスク、信用リスク、流動性リスク等が伴い、',
      highlight: '投資元本を割り込む可能性があります。',
      extra: '過去の運用実績は将来の運用成果を保証するものではありません。市場環境の変化により、予想外の損失が発生する可能性があります。',
      borderColor: 'border-red-500'
    },
    {
      title: '【情報の正確性について】',
      content: '提供される情報は、信頼できると判断した情報源から取得していますが、その正確性、完全性、適時性を保証するものではありません。AI分析結果は参考情報として提供されるものであり、絶対的な投資判断基準ではありません。',
      highlight: '',
      borderColor: 'border-blue-500'
    },
    {
      title: '【投資判断の責任】',
      content: '',
      highlight: '最終的な投資判断は、利用者ご自身の責任において行ってください。',
      extra: '本サービスの利用により生じたいかなる損害についても、当社は一切の責任を負いません。投資を行う際は、証券会社等の金融商品取引業者にご相談ください。',
      borderColor: 'border-slate-500'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % legalDisclosures.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + legalDisclosures.length) % legalDisclosures.length);
  };

  return (
    <footer className="relative z-20 bg-gradient-to-b from-dark-secondary to-dark-card border-t-2 border-accent-red/30 mt-12">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Legal Disclosure Section - Desktop */}
        <div className="hidden md:block bg-amber-50 border-2 border-amber-300 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
              <Shield className="w-6 h-6 text-amber-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5" />
                金融商品取引法に基づく重要事項
              </h3>

              <div className="space-y-3 text-sm leading-relaxed text-slate-800">
                <div className="bg-white/70 rounded p-3 border-l-4 border-amber-500">
                  <p className="font-bold text-amber-900 mb-2">【サービスの性質】</p>
                  <p>
                    本サービスは、AI技術を活用した株式情報の提供および分析ツールです。
                    <strong className="text-red-700">投資助言業務、投資一任業務、金融商品仲介業務には該当せず、特定の金融商品の売買を推奨・勧誘するものではありません。</strong>
                  </p>
                </div>

                <div className="bg-white/70 rounded p-3 border-l-4 border-red-500">
                  <p className="font-bold text-red-900 mb-2">【投資リスクに関する警告】</p>
                  <p>
                    株式投資には価格変動リスク、信用リスク、流動性リスク等が伴い、
                    <strong className="text-red-700">投資元本を割り込む可能性があります。</strong>
                    過去の運用実績は将来の運用成果を保証するものではありません。
                    市場環境の変化により、予想外の損失が発生する可能性があります。
                  </p>
                </div>

                <div className="bg-white/70 rounded p-3 border-l-4 border-blue-500">
                  <p className="font-bold text-blue-900 mb-2">【情報の正確性について】</p>
                  <p>
                    提供される情報は、信頼できると判断した情報源から取得していますが、
                    その正確性、完全性、適時性を保証するものではありません。
                    AI分析結果は参考情報として提供されるものであり、絶対的な投資判断基準ではありません。
                  </p>
                </div>

                <div className="bg-white/70 rounded p-3 border-l-4 border-slate-500">
                  <p className="font-bold text-slate-900 mb-2">【投資判断の責任】</p>
                  <p>
                    <strong className="text-red-700">最終的な投資判断は、利用者ご自身の責任において行ってください。</strong>
                    本サービスの利用により生じたいかなる損害についても、当社は一切の責任を負いません。
                    投資を行う際は、証券会社等の金融商品取引業者にご相談ください。
                  </p>
                </div>

                <div className="bg-slate-100 rounded p-3 mt-4">
                  <p className="font-bold text-slate-900 mb-1">【登録情報】</p>
                  <p className="text-xs text-slate-700">
                    当サービス提供者は金融商品取引業者（投資助言・代理業、投資運用業等）ではありません。
                    金融商品取引法第29条の登録を受けた事業者ではないため、個別の投資助言を行うことはできません。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclosure Section - Mobile Carousel */}
        <div className="md:hidden bg-amber-50 border-2 border-amber-300 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              重要事項
            </h3>
          </div>

          <div className="relative">
            <div className={`bg-white/70 rounded p-3 border-l-4 ${legalDisclosures[currentSlide].borderColor} min-h-[180px]`}>
              <p className="font-bold text-amber-900 mb-2 text-sm">{legalDisclosures[currentSlide].title}</p>
              <div className="text-xs leading-relaxed text-slate-800">
                {legalDisclosures[currentSlide].content && (
                  <p className="mb-2">{legalDisclosures[currentSlide].content}</p>
                )}
                {legalDisclosures[currentSlide].highlight && (
                  <p className="mb-2">
                    <strong className="text-red-700">{legalDisclosures[currentSlide].highlight}</strong>
                  </p>
                )}
                {legalDisclosures[currentSlide].extra && (
                  <p>{legalDisclosures[currentSlide].extra}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={prevSlide}
                className="p-2 bg-white rounded-full shadow-md hover:bg-amber-100 transition-colors"
                aria-label="前へ"
              >
                <ChevronLeft className="w-4 h-4 text-amber-700" />
              </button>

              <div className="flex gap-1.5">
                {legalDisclosures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-amber-600 w-6' : 'bg-amber-300'
                    }`}
                    aria-label={`スライド ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 bg-white rounded-full shadow-md hover:bg-amber-100 transition-colors"
                aria-label="次へ"
              >
                <ChevronRight className="w-4 h-4 text-amber-700" />
              </button>
            </div>
          </div>

          <div className="bg-slate-100 rounded p-2.5 mt-3">
            <p className="font-bold text-slate-900 mb-1 text-xs">【登録情報】</p>
            <p className="text-[10px] leading-relaxed text-slate-700">
              当サービス提供者は金融商品取引業者（投資助言・代理業、投資運用業等）ではありません。
              金融商品取引法第29条の登録を受けた事業者ではないため、個別の投資助言を行うことはできません。
            </p>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="border-t-2 border-gray-700 pt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {/* Legal Documents */}
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                法的文書
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/terms"
                    className="text-accent-red hover:text-red-400 hover:underline flex items-center gap-1"
                  >
                    利用規約 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    プライバシーポリシー <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disclaimer"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    免責事項 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/risk-disclosure"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    リスク開示書面 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specified-commercial-transaction-act"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    特定商取引法表記 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-gray-100 mb-3 flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                お問い合わせ
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/contact"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    お問い合わせフォーム <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    よくある質問 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    サポート <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li className="flex items-center gap-1 text-gray-300">
                  <Phone className="w-3 h-3" />
                  <span>平日 9:00-18:00</span>
                </li>
              </ul>
            </div>

            {/* Service Information */}
            <div>
              <h4 className="font-bold text-gray-100 mb-3 flex items-center gap-2 text-sm">
                <Info className="w-4 h-4" />
                サービス情報
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                <li>AI株式診断サービス</li>
                <li>リアルタイム株価情報</li>
                <li>テクニカル分析</li>
                <li>銘柄スクリーニング</li>
                <li>データ提供: 公開市場情報</li>
                <li>更新頻度: 準リアルタイム</li>
              </ul>
            </div>

            {/* Company Information */}
            <div>
              <h4 className="font-bold text-gray-100 mb-3 flex items-center gap-2 text-sm">
                <Building className="w-4 h-4" />
                運営会社
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    会社概要 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    チーム紹介 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    採用情報 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    プレスリリース <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-400 mb-2 font-medium">
              &copy; {currentYear} AI株式診断サービス. All rights reserved.
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto">
              当サイトで提供される情報は投資勧誘を目的としたものではありません。
              投資に関する最終決定は、利用者ご自身の判断でなさるようお願いいたします。
              掲載されている情報の正確性については万全を期しておりますが、その内容の正確性、安全性、有用性を保証するものではありません。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
