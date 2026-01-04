import { useState, useEffect } from 'react';
import {
  Globe,
  MousePointerClick,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface UserSession {
  id: string;
  session_id: string;
  stock_code: string;
  stock_name: string;
  url_params: Record<string, string>;
  first_visit_at: string;
  converted: number;
  converted_at: string | null;
  events?: UserEvent[];
}

interface UserEvent {
  id: string;
  event_type: string;
  event_data: Record<string, any>;
  stock_code: string;
  stock_name: string;
  duration_ms: number | null;
  gclid: string | null;
  created_at: string;
}

export default function SessionsTab() {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [events, setEvents] = useState<Record<string, UserEvent[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterConverted, setFilterConverted] = useState<'all' | 'converted' | 'not_converted'>('all');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/admin/sessions?days=7&limit=100');
      const data = await response.json();

      if (data.sessions) {
        setSessions(data.sessions);

        const eventsBySession: Record<string, UserEvent[]> = {};
        data.sessions.forEach(session => {
          if (session.events) {
            eventsBySession[session.session_id] = session.events;
          }
        });
        setEvents(eventsBySession);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSession = (sessionId: string) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSessions(newExpanded);
  };

  const filteredSessions = sessions.filter(session => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        session.stock_code?.toLowerCase().includes(searchLower) ||
        session.stock_name?.toLowerCase().includes(searchLower) ||
        session.url_params?.gclid?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Conversion filter
    if (filterConverted === 'converted' && !session.converted) return false;
    if (filterConverted === 'not_converted' && session.converted) return false;

    return true;
  });

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900"></div>
        <p className="mt-4 text-slate-600">加载会话数据...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索股票代码、股票名称或gclid..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Conversion Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <select
              value={filterConverted}
              onChange={(e) => setFilterConverted(e.target.value as any)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
            >
              <option value="all">全部会话</option>
              <option value="converted">已转化</option>
              <option value="not_converted">未转化</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            用户会话 ({filteredSessions.length})
          </h3>
        </div>

        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <p className="text-slate-600">没有找到匹配的会话</p>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              events={events[session.session_id] || []}
              isExpanded={expandedSessions.has(session.session_id)}
              onToggle={() => toggleSession(session.session_id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface SessionCardProps {
  session: UserSession;
  events: UserEvent[];
  isExpanded: boolean;
  onToggle: () => void;
}

function SessionCard({ session, events, isExpanded, onToggle }: SessionCardProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Session Header */}
      <div
        onClick={onToggle}
        className="p-4 cursor-pointer hover:bg-slate-50 transition"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-300 rounded-lg">
                <span className="font-bold text-blue-900 text-base">
                  {session.stock_code || 'N/A'}
                </span>
                <span className="font-semibold text-blue-700">
                  {session.stock_name || 'Unknown'}
                </span>
              </div>
              {session.converted && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  <CheckCircle className="w-3 h-3" />
                  已转化
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(session.first_visit_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>来源: {session.url_params?.src || '直接访问'}</span>
              </div>
              {session.url_params?.gclid && (
                <div className="flex items-center gap-1">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-mono text-xs">
                    {session.url_params.gclid.substring(0, 12)}...
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </div>

      {/* Session Timeline */}
      {isExpanded && (
        <div className="border-t border-slate-200 bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-900 mb-4">用户行为时间线</h4>
          <div className="space-y-3">
            {events.map((event, index) => (
              <EventItem key={event.id} event={event} isLast={index === events.length - 1} />
            ))}
            {events.length === 0 && (
              <p className="text-sm text-slate-600 text-center py-4">暂无事件记录</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface EventItemProps {
  event: UserEvent;
  isLast: boolean;
}

function EventItem({ event, isLast }: EventItemProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'page_load':
        return <Globe className="w-5 h-5 text-blue-600" />;
      case 'diagnosis_click':
        return <MousePointerClick className="w-5 h-5 text-purple-600" />;
      case 'conversion':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-600" />;
    }
  };

  const getEventTitle = (type: string) => {
    switch (type) {
      case 'page_load':
        return '加载网站';
      case 'diagnosis_click':
        return '诊断股票';
      case 'conversion':
        return '转化成功';
      default:
        return type;
    }
  };

  const getEventBgColor = (type: string) => {
    switch (type) {
      case 'page_load':
        return 'bg-blue-100 border-blue-300';
      case 'diagnosis_click':
        return 'bg-purple-100 border-purple-300';
      case 'conversion':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-slate-100 border-slate-300';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`p-2 rounded-lg border-2 ${getEventBgColor(event.event_type)}`}>
          {getEventIcon(event.event_type)}
        </div>
        {!isLast && <div className="flex-1 w-0.5 bg-slate-300 mt-2" style={{ minHeight: '24px' }} />}
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h5 className="font-semibold text-slate-900">{getEventTitle(event.event_type)}</h5>
          <span className="text-xs text-slate-500">{formatTime(event.created_at)}</span>
        </div>
        <div className="text-sm text-slate-600 space-y-1">
          {event.event_type === 'page_load' && (
            <>
              <p>股票代码: <span className="font-semibold">{event.stock_code}</span></p>
              <p>股票名称: <span className="font-semibold">{event.stock_name}</span></p>
              {event.event_data?.url && (
                <p className="text-xs break-all">URL: {event.event_data.url}</p>
              )}
            </>
          )}
          {event.event_type === 'diagnosis_click' && (
            <>
              <p>股票名称: <span className="font-semibold">{event.stock_name}</span></p>
              {event.duration_ms && (
                <p>加载时长: <span className="font-semibold">{(event.duration_ms / 1000).toFixed(2)}秒</span></p>
              )}
            </>
          )}
          {event.event_type === 'conversion' && (
            <>
              {event.gclid && (
                <p>GCLID: <span className="font-mono text-xs">{event.gclid}</span></p>
              )}
              <p>转换时间: <span className="font-semibold">{formatTime(event.created_at)}</span></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
