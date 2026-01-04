import { useEffect, useState } from 'react';
import { Activity, Database, Zap, TrendingUp } from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface RateLimitStatus {
  rpm: { current: number; limit: number; remaining: number };
  rpd: { current: number; limit: number; remaining: number };
}

interface TodayStats {
  totals: {
    requests_total: number;
    cache_hits: number;
    api_calls: number;
    errors_count: number;
  };
  cacheHitRate: string;
}

interface StatsData {
  rateLimit: RateLimitStatus;
  today: TodayStats;
}

export default function ApiStatsDisplay() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/api/gemini/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  const cacheHitRate = parseFloat(stats.today.cacheHitRate);
  const apiUsagePercent = (stats.rateLimit.rpd.current / stats.rateLimit.rpd.limit) * 100;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-br from-accent-red to-accent-red-dark text-white p-2.5 rounded-full shadow-red-glow hover:shadow-red-glow-lg transition-all hover:scale-110"
          title="API統計を表示"
        >
          <Activity className="w-5 h-5" />
        </button>
      ) : (
        <div className="bg-dark-secondary rounded-xl shadow-red-glow-lg p-3 w-72 border-2 border-accent-red/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent-red" />
              API統計
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-200 text-xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            <div className="bg-dark-card p-3 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-gray-300">キャッシュ効率</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{cacheHitRate.toFixed(1)}%</div>
              <div className="text-xs text-gray-400 mt-1">
                {stats.today.totals.cache_hits} / {stats.today.totals.requests_total} リクエスト
              </div>
            </div>

            <div className="bg-dark-card p-3 rounded-lg border border-accent-red/30">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-accent-red" />
                <span className="text-sm font-semibold text-gray-300">今日のAPI使用</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {stats.rateLimit.rpd.current} / {stats.rateLimit.rpd.limit}
              </div>
              <div className="w-full bg-dark-primary rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    apiUsagePercent > 80 ? 'bg-red-500' : apiUsagePercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(apiUsagePercent, 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">残り {stats.rateLimit.rpd.remaining} 回</div>
            </div>

            <div className="bg-dark-card p-3 rounded-lg border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-300">分あたりレート</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {stats.rateLimit.rpm.current} / {stats.rateLimit.rpm.limit}
              </div>
              <div className="text-xs text-gray-400 mt-1">現在の使用状況</div>
            </div>

            {stats.today.totals.errors_count > 0 && (
              <div className="bg-dark-card p-2 rounded border border-red-500">
                <div className="text-xs text-red-400">
                  エラー: {stats.today.totals.errors_count} 件
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-400 text-center">
              30秒ごとに自動更新
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
