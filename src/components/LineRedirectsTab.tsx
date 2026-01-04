import { useState, useEffect } from 'react';
import { Link2, Plus, Trash2, Edit2, Save, X, BarChart3, Power } from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface LineRedirectLink {
  id: string;
  line_url: string;
  weight: number;
  is_active: number;
  hit_count: number;
  created_at: string;
  updated_at: string;
}

export default function LineRedirectsTab() {
  const [links, setLinks] = useState<LineRedirectLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({ line_url: '', weight: 50 });
  const [editForm, setEditForm] = useState({ line_url: '', weight: 50 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading LINE redirect links...');
      const response = await apiClient.get('/api/line-redirects');
      const data = await response.json();
      console.log('Received data:', data);
      if (data.success) {
        setLinks(data.links);
        console.log('Links loaded successfully:', data.links.length);
      } else {
        setError('加载失败：服务器返回错误');
      }
    } catch (error) {
      console.error('Failed to load LINE redirect links:', error);
      setError(`加载失败: ${error instanceof Error ? error.message : '网络错误'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async () => {
    if (!newLink.line_url.includes('line.me')) {
      alert('请输入有效的LINE链接（必须包含 line.me）');
      return;
    }

    setSaving(true);
    try {
      const response = await apiClient.post('/api/line-redirects', newLink);
      const data = await response.json();

      if (data.success) {
        await loadLinks();
        setShowAddForm(false);
        setNewLink({ line_url: '', weight: 50 });
        alert('链接创建成功！');
      } else {
        alert('创建失败，请重试');
      }
    } catch (error) {
      console.error('Failed to add link:', error);
      alert('添加链接失败: ' + (error instanceof Error ? error.message : '未知错误'));
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateLink = async (id: string) => {
    if (!editForm.line_url.includes('line.me')) {
      alert('请输入有效的LINE链接（必须包含 line.me）');
      return;
    }

    try {
      const response = await apiClient.put(`/api/line-redirects/${id}`, editForm);

      if (response.ok) {
        await loadLinks();
        setEditingId(null);
      }
    } catch (error) {
      console.error('Failed to update link:', error);
      alert('更新链接失败');
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!confirm('确定要删除这个链接吗？')) {
      return;
    }

    try {
      const response = await apiClient.delete(`/api/line-redirects/${id}`);

      if (response.ok) {
        await loadLinks();
      }
    } catch (error) {
      console.error('Failed to delete link:', error);
      alert('删除链接失败');
    }
  };

  const handleToggleActive = async (link: LineRedirectLink) => {
    try {
      const response = await apiClient.put(`/api/line-redirects/${link.id}`, { is_active: link.is_active ? 0 : 1 });

      if (response.ok) {
        await loadLinks();
      }
    } catch (error) {
      console.error('Failed to toggle link status:', error);
      alert('切换状态失败');
    }
  };

  const startEdit = (link: LineRedirectLink) => {
    setEditingId(link.id);
    setEditForm({ line_url: link.line_url, weight: link.weight });
  };

  const totalWeight = links.filter(l => l.is_active).reduce((sum, l) => sum + l.weight, 0);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900"></div>
        <p className="mt-4 text-slate-600">加载分流链接...</p>
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadLinks}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
            >
              重试
            </button>
          </div>
        )}
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="text-center py-20">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadLinks}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">LINE分流链接管理</h2>
          <p className="text-sm text-slate-600 mt-1">创建和管理多个LINE链接，系统将根据权重自动分配流量</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? '取消' : '添加链接'}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-4">添加新的LINE链接</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                LINE URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newLink.line_url}
                onChange={(e) => setNewLink({ ...newLink, line_url: e.target.value })}
                placeholder="https://line.me/R/ti/p/@example"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                权重 (1-100) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={newLink.weight}
                onChange={(e) => setNewLink({ ...newLink, weight: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
              />
              <p className="text-xs text-slate-500 mt-1">权重越高，被选中的概率越大</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddLink}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition text-gray-900"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    保存中...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    保存
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewLink({ line_url: '', weight: 50 });
                }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weight Distribution */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900">权重分布</h3>
        </div>
        <div className="text-2xl font-bold text-blue-600 mb-2">总权重: {totalWeight}</div>
        <p className="text-sm text-slate-600">
          活跃链接: {links.filter(l => l.is_active).length} / {links.length}
        </p>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {links.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <Link2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">还没有创建任何分流链接</p>
            <p className="text-sm text-slate-500 mt-2">点击上方"添加链接"按钮开始创建</p>
          </div>
        ) : (
          links.map((link) => (
            <div
              key={link.id}
              className={`bg-white rounded-xl shadow-sm border transition ${
                link.is_active ? 'border-slate-200' : 'border-slate-300 bg-slate-50'
              }`}
            >
              {editingId === link.id ? (
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">LINE URL</label>
                      <input
                        type="text"
                        value={editForm.line_url}
                        onChange={(e) => setEditForm({ ...editForm, line_url: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">权重</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={editForm.weight}
                        onChange={(e) => setEditForm({ ...editForm, weight: parseInt(e.target.value) || 1 })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdateLink(link.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                      >
                        <Save className="w-4 h-4" />
                        保存
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link2 className={`w-5 h-5 ${link.is_active ? 'text-blue-600' : 'text-slate-400'}`} />
                        <a
                          href={link.line_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 hover:underline font-medium break-all"
                        >
                          {link.line_url}
                        </a>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600 ml-8">
                        <div>
                          <span className="font-medium">权重:</span>{' '}
                          <span className="font-bold text-slate-900">{link.weight}</span>
                        </div>
                        <div>
                          <span className="font-medium">命中次数:</span>{' '}
                          <span className="font-bold text-slate-900">{link.hit_count}</span>
                        </div>
                        {totalWeight > 0 && link.is_active && (
                          <div>
                            <span className="font-medium">概率:</span>{' '}
                            <span className="font-bold text-green-600">
                              {((link.weight / totalWeight) * 100).toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(link)}
                        className={`p-2 rounded-lg transition ${
                          link.is_active
                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                        title={link.is_active ? '禁用' : '启用'}
                      >
                        <Power className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startEdit(link)}
                        className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition"
                        title="编辑"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
