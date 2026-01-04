import { useState, useEffect } from 'react';
import { Link2, Plus, Trash2, Edit2, Save, X, BarChart3, Power, ExternalLink, Tag } from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface RedirectLink {
  id: string;
  redirect_url: string;
  label: string;
  url_type: string;
  weight: number;
  is_active: number;
  hit_count: number;
  created_at: string;
  updated_at: string;
}

const URL_TYPES = [
  { value: 'line', label: 'LINE', color: 'bg-green-100 text-green-700' },
  { value: 'website', label: 'Website', color: 'bg-blue-100 text-blue-700' },
  { value: 'social', label: 'Social Media', color: 'bg-purple-100 text-purple-700' },
  { value: 'general', label: 'General', color: 'bg-slate-100 text-slate-700' },
];

export default function RedirectLinksTab() {
  const [links, setLinks] = useState<RedirectLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({ redirect_url: '', weight: 50, label: '', url_type: 'general' });
  const [editForm, setEditForm] = useState({ redirect_url: '', weight: 50, label: '', url_type: 'general' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading redirect links...');
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
      console.error('Failed to load redirect links:', error);
      setError(`加载失败: ${error instanceof Error ? error.message : '网络错误'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async () => {
    if (!newLink.redirect_url.trim()) {
      alert('请输入有效的URL');
      return;
    }

    try {
      new URL(newLink.redirect_url);
    } catch (e) {
      alert('请输入有效的URL格式（例如: https://example.com）');
      return;
    }

    setSaving(true);
    try {
      const response = await apiClient.post('/api/line-redirects', newLink);
      const data = await response.json();

      if (data.success) {
        await loadLinks();
        setShowAddForm(false);
        setNewLink({ redirect_url: '', weight: 50, label: '', url_type: 'general' });
        alert('链接创建成功！');
      } else {
        alert(data.error || '创建失败，请重试');
      }
    } catch (error) {
      console.error('Failed to add link:', error);
      alert('添加链接失败: ' + (error instanceof Error ? error.message : '未知错误'));
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateLink = async (id: string) => {
    if (!editForm.redirect_url.trim()) {
      alert('请输入有效的URL');
      return;
    }

    try {
      new URL(editForm.redirect_url);
    } catch (e) {
      alert('请输入有效的URL格式（例如: https://example.com）');
      return;
    }

    try {
      const response = await apiClient.put(`/api/line-redirects/${id}`, editForm);
      const data = await response.json();

      if (data.success) {
        await loadLinks();
        setEditingId(null);
      } else {
        alert(data.error || '更新链接失败');
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

  const handleToggleActive = async (link: RedirectLink) => {
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

  const startEdit = (link: RedirectLink) => {
    setEditingId(link.id);
    setEditForm({
      redirect_url: link.redirect_url,
      weight: link.weight,
      label: link.label || '',
      url_type: link.url_type || 'general'
    });
  };

  const getUrlTypeInfo = (type: string) => {
    return URL_TYPES.find(t => t.value === type) || URL_TYPES[3];
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">分流链接管理</h2>
          <p className="text-sm text-slate-600 mt-1">创建和管理多个跳转链接，系统将根据权重自动分配流量</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? '取消' : '添加链接'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-4">添加新的跳转链接</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                跳转URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newLink.redirect_url}
                onChange={(e) => setNewLink({ ...newLink, redirect_url: e.target.value })}
                placeholder="https://example.com 或 https://line.me/R/ti/p/@example"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                标签（可选）
              </label>
              <input
                type="text"
                value={newLink.label}
                onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                placeholder="为链接添加描述性标签"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                链接类型
              </label>
              <select
                value={newLink.url_type}
                onChange={(e) => setNewLink({ ...newLink, url_type: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
              >
                {URL_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
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
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
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
                  setNewLink({ redirect_url: '', weight: 50, label: '', url_type: 'general' });
                }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

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
                      <label className="block text-sm font-medium text-slate-700 mb-2">跳转URL</label>
                      <input
                        type="text"
                        value={editForm.redirect_url}
                        onChange={(e) => setEditForm({ ...editForm, redirect_url: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">标签</label>
                      <input
                        type="text"
                        value={editForm.label}
                        onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">链接类型</label>
                      <select
                        value={editForm.url_type}
                        onChange={(e) => setEditForm({ ...editForm, url_type: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {URL_TYPES.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
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
                        {link.label && (
                          <span className="flex items-center gap-1 text-sm font-medium text-slate-700">
                            <Tag className="w-3 h-3" />
                            {link.label}
                          </span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getUrlTypeInfo(link.url_type).color}`}>
                          {getUrlTypeInfo(link.url_type).label}
                        </span>
                      </div>
                      <a
                        href={link.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline font-medium break-all ml-8"
                      >
                        {link.redirect_url}
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                      <div className="flex items-center gap-4 text-sm text-slate-600 ml-8 mt-2">
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
