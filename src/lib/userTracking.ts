import { apiClient } from './apiClient';

const SESSION_ID_KEY = 'user_session_id';

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export interface TrackPageLoadParams {
  stockCode?: string;
  stockName?: string;
  urlParams: Record<string, string>;
}

export interface TrackDiagnosisParams {
  stockCode: string;
  stockName: string;
  durationMs: number;
}

export interface TrackConversionParams {
  gclid?: string;
}

export interface TrackEventParams {
  sessionId: string;
  eventType: string;
  stockCode?: string;
  stockName?: string;
  eventData?: Record<string, any>;
}

export const userTracking = {
  async trackPageLoad(params: TrackPageLoadParams): Promise<void> {
    try {
      const sessionId = getOrCreateSessionId();

      await apiClient.post('/api/tracking/session', {
        sessionId,
        stockCode: params.stockCode,
        stockName: params.stockName,
        urlParams: params.urlParams,
        userAgent: navigator.userAgent
      });

      await apiClient.post('/api/tracking/event', {
        sessionId,
        eventType: 'page_load',
        eventData: {
          url: window.location.href,
          referrer: document.referrer,
          ...params.urlParams
        },
        stockCode: params.stockCode,
        stockName: params.stockName,
        gclid: params.urlParams.gclid
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
  },

  async trackDiagnosisClick(params: TrackDiagnosisParams): Promise<void> {
    try {
      const sessionId = getOrCreateSessionId();

      await apiClient.post('/api/tracking/event', {
        sessionId,
        eventType: 'diagnosis_click',
        eventData: {
          stock_code: params.stockCode,
          stock_name: params.stockName,
          duration_ms: params.durationMs
        },
        stockCode: params.stockCode,
        stockName: params.stockName,
        durationMs: params.durationMs
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
  },

  async trackConversion(params: TrackConversionParams): Promise<void> {
    try {
      const sessionId = getOrCreateSessionId();

      await apiClient.post('/api/tracking/event', {
        sessionId,
        eventType: 'conversion',
        eventData: {
          gclid: params.gclid,
          conversion_time: new Date().toISOString()
        },
        gclid: params.gclid
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
  },

  async trackEvent(params: TrackEventParams): Promise<void> {
    try {
      await apiClient.post('/api/tracking/event', {
        sessionId: params.sessionId,
        eventType: params.eventType,
        stockCode: params.stockCode,
        stockName: params.stockName,
        eventData: params.eventData
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
  },

  getSessionId(): string {
    return getOrCreateSessionId();
  }
};
