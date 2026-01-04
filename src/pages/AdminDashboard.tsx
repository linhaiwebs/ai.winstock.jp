import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  TrendingUp,
  LogOut,
  Clock,
  Activity,
  CheckCircle2,
  XCircle,
  Link2,
  Settings,
  FileDown
} from 'lucide-react';
import { adminAuth } from '../lib/adminAuth';
import { apiClient } from '../lib/apiClient';
import SessionsTab from '../components/SessionsTab';
import RedirectLinksTab from '../components/RedirectLinksTab';
import GoogleTrackingTab from '../components/GoogleTrackingTab';

interface Stats {
  totalSessions: number;
  totalEvents: number;
  pageLoads: number;
  diagnoses: number;
  conversions: number;
  conversionRate: number;
  reportDownloads?: number;
}

interface ApiStats {
  requestsTotal: number;
  cacheHits: number;
  apiCalls: number;
  cacheHitRate: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'line-redirects' | 'google-tracking'>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [apiStats, setApiStats] = useState<ApiStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/admin/stats?days=7');
      const data = await response.json();

      if (data.summary) {
        setStats({
          totalSessions: data.summary.total_sessions || 0,
          totalEvents: data.summary.total_events || 0,
          pageLoads: data.summary.page_loads || 0,
          diagnoses: data.summary.diagnoses || 0,
          conversions: data.summary.conversions || 0,
          conversionRate: parseFloat(data.summary.conversion_rate) || 0,
          reportDownloads: data.summary.report_downloads || 0
        });
      }

      const apiStatsResponse = await apiClient.get('/api/gemini/stats');
      const apiStatsData = await apiStatsResponse.json();
      if (apiStatsData.today) {
        const totals = apiStatsData.today.totals;
        setApiStats({
          requestsTotal: totals.requests_total || 0,
          cacheHits: totals.cache_hits || 0,
          apiCalls: totals.api_calls || 0,
          cacheHitRate: parseFloat(apiStatsData.today.cacheHitRate) || 0
        });
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await adminAuth.logout();
    navigate('/adsadmin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">广告管理后台</h1>
                <p className="text-sm text-slate-600">用户行为分析与API监控</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span>退出登录</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>总览</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                activeTab === 'sessions'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>用户会话</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('line-redirects')}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                activeTab === 'line-redirects'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                <span>分流链接</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('google-tracking')}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                activeTab === 'google-tracking'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Google追踪</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && activeTab === 'overview' ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900"></div>
            <p className="mt-4 text-slate-600">加载数据中...</p>
          </div>
        ) : activeTab === 'overview' ? (
          <OverviewTab stats={stats} apiStats={apiStats} />
        ) : activeTab === 'sessions' ? (
          <SessionsTab />
        ) : activeTab === 'line-redirects' ? (
          <RedirectLinksTab />
        ) : (
          <GoogleTrackingTab />
        )}
      </div>
    </div>
  );
}

function OverviewTab({ stats, apiStats }: { stats: Stats | null; apiStats: ApiStats | null }) {
  return (
    <div className="space-y-6">
      {/* User Activity Stats */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">用户活动统计 (最近7天)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            icon={<Users className="w-6 h-6" />}
            label="总访问量"
            value={stats?.totalSessions || 0}
            color="blue"
          />
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            label="诊断次数"
            value={stats?.diagnoses || 0}
            color="purple"
          />
          <StatCard
            icon={<FileDown className="w-6 h-6" />}
            label="レポートダウンロード数"
            value={stats?.reportDownloads || 0}
            color="purple"
          />
          <StatCard
            icon={<CheckCircle2 className="w-6 h-6" />}
            label="转化次数"
            value={stats?.conversions || 0}
            color="green"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="转化率"
            value={`${stats?.conversionRate.toFixed(2) || 0}%`}
            color="orange"
          />
        </div>
      </div>

      {/* API Usage Stats */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">API使用统计 (最近24小时)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Activity className="w-6 h-6" />}
            label="总请求数"
            value={apiStats?.requestsTotal || 0}
            color="blue"
          />
          <StatCard
            icon={<CheckCircle2 className="w-6 h-6" />}
            label="缓存命中"
            value={apiStats?.cacheHits || 0}
            color="green"
          />
          <StatCard
            icon={<XCircle className="w-6 h-6" />}
            label="API调用"
            value={apiStats?.apiCalls || 0}
            color="red"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="缓存命中率"
            value={`${apiStats?.cacheHitRate.toFixed(1) || 0}%`}
            color="purple"
          />
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">转化漏斗</h3>
        <div className="space-y-3">
          <FunnelStep
            label="页面访问"
            value={stats?.pageLoads || 0}
            total={stats?.pageLoads || 1}
            color="blue"
          />
          <FunnelStep
            label="诊断股票"
            value={stats?.diagnoses || 0}
            total={stats?.pageLoads || 1}
            color="purple"
          />
          <FunnelStep
            label="LINE转化"
            value={stats?.conversions || 0}
            total={stats?.pageLoads || 1}
            color="green"
          />
        </div>
      </div>
    </div>
  );
}


interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-600 mt-1">{label}</p>
    </div>
  );
}

interface FunnelStepProps {
  label: string;
  value: number;
  total: number;
  color: 'blue' | 'purple' | 'green';
}

function FunnelStep({ label, value, total, color }: FunnelStepProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-bold text-slate-900">
          {value} ({percentage.toFixed(1)}%)
        </span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
