import { useState, useEffect } from 'react';
import { Save, CheckCircle, AlertCircle, BarChart3, Eye, EyeOff } from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface GoogleTrackingConfig {
  google_ads_conversion_id: string;
  ga4_measurement_id: string;
  conversion_action_id: string;
  is_enabled: boolean;
}

export default function GoogleTrackingTab() {
  const [config, setConfig] = useState<GoogleTrackingConfig>({
    google_ads_conversion_id: '',
    ga4_measurement_id: '',
    conversion_action_id: '',
    is_enabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading Google tracking config...');
      const response = await apiClient.get('/api/google-tracking');
      const data = await response.json();
      console.log('Received config data:', data);
      if (data.success && data.config) {
        setConfig(data.config);
        console.log('Config loaded successfully');
      } else {
        setError('加载失败：服务器返回错误');
      }
    } catch (error) {
      console.error('Failed to load Google tracking config:', error);
      setError(`加载失败: ${error instanceof Error ? error.message : '网络错误'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const response = await apiClient.post('/api/google-tracking', config);
      const data = await response.json();

      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);

        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to save Google tracking config:', error);
      alert('保存配置失败');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900"></div>
        <p className="mt-4 text-slate-600">加载追踪配置...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Google 追踪配置</h2>
        <p className="text-sm text-slate-600 mt-1">配置 Google Ads 和 Google Analytics 4 追踪代码</p>
      </div>

      {/* Status Banner */}
      <div className={`rounded-xl shadow-sm border p-4 ${
        config.is_enabled
          ? 'bg-green-50 border-green-200'
          : 'bg-amber-50 border-amber-200'
      }`}>
        <div className="flex items-center gap-3">
          {config.is_enabled ? (
            <>
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-green-900">追踪代码已启用</div>
                <div className="text-sm text-green-700">Google 追踪脚本已在前端页面加载</div>
              </div>
            </>
          ) : (
            <>
              <div className="p-2 bg-amber-100 rounded-lg">
                <EyeOff className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="font-bold text-amber-900">追踪代码未启用</div>
                <div className="text-sm text-amber-700">配置完成后启用追踪功能</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="space-y-6">
          {/* Google Ads Conversion ID */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Google Ads 转化跟踪 ID
              </div>
            </label>
            <input
              type="text"
              value={config.google_ads_conversion_id}
              onChange={(e) => setConfig({ ...config, google_ads_conversion_id: e.target.value })}
              placeholder="AW-XXXXXXXXXX"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm text-gray-900"
            />
            <p className="text-xs text-slate-500 mt-1">
              格式: AW-XXXXXXXXXX (从 Google Ads 转化跟踪页面获取)
            </p>
          </div>

          {/* GA4 Measurement ID */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Google Analytics 4 测量 ID
              </div>
            </label>
            <input
              type="text"
              value={config.ga4_measurement_id}
              onChange={(e) => setConfig({ ...config, ga4_measurement_id: e.target.value })}
              placeholder="G-XXXXXXXXXX"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm text-gray-900"
            />
            <p className="text-xs text-slate-500 mt-1">
              格式: G-XXXXXXXXXX (从 Google Analytics 4 数据流详情获取)
            </p>
          </div>

          {/* Conversion Action ID */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                转化操作 ID
              </div>
            </label>
            <input
              type="text"
              value={config.conversion_action_id}
              onChange={(e) => setConfig({ ...config, conversion_action_id: e.target.value })}
              placeholder="AW-XXXXXXXXXX/YYYYYYYYYY"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm text-gray-900"
            />
            <p className="text-xs text-slate-500 mt-1">
              格式: AW-XXXXXXXXXX/YYYYYYYYYY (完整的转化操作 ID)
            </p>
          </div>

          {/* Enable Toggle */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
            <input
              type="checkbox"
              id="is_enabled"
              checked={config.is_enabled}
              onChange={(e) => setConfig({ ...config, is_enabled: e.target.checked })}
              className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="is_enabled" className="text-sm font-medium text-slate-700 cursor-pointer">
              启用 Google 追踪代码
            </label>
          </div>

          {/* Information Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-2">使用说明：</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>填写配置后点击"保存配置"按钮</li>
                  <li>启用追踪后，Google 脚本将自动加载到前端页面</li>
                  <li>当用户点击诊断结果的 LINE 按钮时，将触发转化事件</li>
                  <li>可以在 Google Ads 和 Google Analytics 中查看转化数据</li>
                  <li>如需测试，可以在浏览器控制台查看追踪事件日志</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              保存配置
            </>
          )}
        </button>

        {saveSuccess && (
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <CheckCircle className="w-5 h-5" />
            配置保存成功！页面将刷新以应用新配置
          </div>
        )}
      </div>

      {/* Current Configuration Display */}
      {(config.google_ads_conversion_id || config.ga4_measurement_id) && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-4">当前配置</h3>
          <div className="space-y-2 text-sm">
            {config.google_ads_conversion_id && (
              <div className="flex items-start gap-2">
                <span className="text-slate-600 w-32 flex-shrink-0">Google Ads:</span>
                <span className="font-mono text-slate-900">{config.google_ads_conversion_id}</span>
              </div>
            )}
            {config.ga4_measurement_id && (
              <div className="flex items-start gap-2">
                <span className="text-slate-600 w-32 flex-shrink-0">GA4:</span>
                <span className="font-mono text-slate-900">{config.ga4_measurement_id}</span>
              </div>
            )}
            {config.conversion_action_id && (
              <div className="flex items-start gap-2">
                <span className="text-slate-600 w-32 flex-shrink-0">转化操作:</span>
                <span className="font-mono text-slate-900">{config.conversion_action_id}</span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="text-slate-600 w-32 flex-shrink-0">状态:</span>
              <span className={`font-semibold ${config.is_enabled ? 'text-green-600' : 'text-amber-600'}`}>
                {config.is_enabled ? '已启用' : '未启用'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
