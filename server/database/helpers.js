import db from './db.js';

function generateUUID() {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export function cleanExpiredCache() {
  try {
    const now = new Date().toISOString();
    const stmt = db.prepare('DELETE FROM diagnosis_cache WHERE expires_at < ?');
    const result = stmt.run(now);
    console.log(`Cleaned ${result.changes} expired cache entries`);
    return true;
  } catch (error) {
    console.error('Error cleaning expired cache:', error);
    return false;
  }
}

export function getCacheStats() {
  try {
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      SELECT
        COUNT(*) as total_entries,
        SUM(CASE WHEN expires_at > ? THEN 1 ELSE 0 END) as valid_entries,
        SUM(CASE WHEN expires_at <= ? THEN 1 ELSE 0 END) as expired_entries,
        SUM(hit_count) as total_hits,
        AVG(hit_count) as avg_hit_count
      FROM diagnosis_cache
    `);
    return stmt.get(now, now);
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return null;
  }
}

export function getSessionSummary(daysBack = 7) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    const cutoff = cutoffDate.toISOString();

    const stmt = db.prepare(`
      SELECT
        COUNT(DISTINCT s.session_id) as total_sessions,
        COUNT(e.id) as total_events,
        SUM(CASE WHEN e.event_type = 'page_load' THEN 1 ELSE 0 END) as page_loads,
        SUM(CASE WHEN e.event_type = 'diagnosis_click' THEN 1 ELSE 0 END) as diagnoses,
        SUM(CASE WHEN e.event_type = 'report_download' THEN 1 ELSE 0 END) as report_downloads,
        SUM(CASE WHEN e.event_type = 'conversion' THEN 1 ELSE 0 END) as conversions,
        CASE
          WHEN COUNT(DISTINCT s.session_id) > 0
          THEN ROUND((CAST(SUM(CASE WHEN e.event_type = 'conversion' THEN 1 ELSE 0 END) AS REAL) / COUNT(DISTINCT s.session_id)) * 100, 2)
          ELSE 0
        END as conversion_rate
      FROM user_sessions s
      LEFT JOIN user_events e ON s.session_id = e.session_id
      WHERE s.first_visit_at >= ?
    `);

    return stmt.get(cutoff);
  } catch (error) {
    console.error('Error getting session summary:', error);
    return null;
  }
}

export function getPopularStocks(daysBack = 7, limitCount = 10) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    const cutoff = cutoffDate.toISOString();

    const stmt = db.prepare(`
      SELECT
        s.stock_code,
        s.stock_name,
        COUNT(DISTINCT s.session_id) as visit_count,
        SUM(CASE WHEN e.event_type = 'diagnosis_click' THEN 1 ELSE 0 END) as diagnosis_count,
        SUM(CASE WHEN e.event_type = 'conversion' THEN 1 ELSE 0 END) as conversion_count
      FROM user_sessions s
      LEFT JOIN user_events e ON s.session_id = e.session_id
      WHERE s.first_visit_at >= ? AND s.stock_code IS NOT NULL
      GROUP BY s.stock_code, s.stock_name
      ORDER BY visit_count DESC
      LIMIT ?
    `);

    return stmt.all(cutoff, limitCount);
  } catch (error) {
    console.error('Error getting popular stocks:', error);
    return [];
  }
}

export { generateUUID };
