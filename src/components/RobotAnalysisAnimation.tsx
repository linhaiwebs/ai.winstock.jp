import { Bot, Search } from 'lucide-react';

export default function RobotAnalysisAnimation() {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative">
        <div className="bg-gradient-to-br from-accent-red to-accent-red-dark rounded-2xl p-6 shadow-red-glow-lg">
          <div className="relative">
            <Bot className="w-16 h-16 text-white" />
            <div className="absolute -top-2 -right-2 bg-dark-card rounded-lg px-2 py-1 shadow-md border border-accent-red">
              <span className="text-xs font-bold text-accent-red">株式AI</span>
            </div>
          </div>
        </div>

        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 animate-bounce">
          <div className="bg-yellow-500 rounded-full p-3 shadow-lg">
            <Search className="w-8 h-8 text-yellow-900 animate-pulse" />
          </div>
        </div>

        <div className="absolute -left-8 top-4 w-3 h-3 bg-accent-red rounded-full animate-ping opacity-75"></div>
        <div className="absolute -right-8 bottom-4 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute left-12 -top-4 w-2 h-2 bg-red-300 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.6s' }}></div>
      </div>
    </div>
  );
}
