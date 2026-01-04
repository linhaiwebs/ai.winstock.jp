import db from '../database/db.js';
import { generateUUID } from '../database/helpers.js';

export async function recordUsageStats({ cacheHit, apiCall, error, responseTime, queueLength = 0 }) {
  try {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const hour = now.getHours();

    const existingStmt = db.prepare(`
      SELECT * FROM api_usage_stats
      WHERE date = ? AND hour = ?
    `);
    const existing = existingStmt.get(date, hour);

    if (existing) {
      const updateStmt = db.prepare(`
        UPDATE api_usage_stats
        SET
          requests_total = requests_total + 1,
          cache_hits = cache_hits + ?,
          api_calls = api_calls + ?,
          errors_count = errors_count + ?,
          queue_length_avg = ROUND((queue_length_avg + ?) / 2.0),
          response_time_avg = ROUND((response_time_avg * requests_total + ?) / (requests_total + 1.0)),
          updated_at = ?
        WHERE id = ?
      `);

      updateStmt.run(
        cacheHit ? 1 : 0,
        apiCall ? 1 : 0,
        error ? 1 : 0,
        queueLength,
        responseTime,
        now.toISOString(),
        existing.id
      );
    } else {
      const id = generateUUID();
      const insertStmt = db.prepare(`
        INSERT INTO api_usage_stats
        (id, date, hour, requests_total, cache_hits, api_calls, errors_count, queue_length_avg, response_time_avg)
        VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?)
      `);

      insertStmt.run(
        id,
        date,
        hour,
        cacheHit ? 1 : 0,
        apiCall ? 1 : 0,
        error ? 1 : 0,
        queueLength,
        responseTime
      );
    }
  } catch (error) {
    console.error('Error in recordUsageStats:', error);
  }
}

export async function getTodayStats() {
  try {
    const today = new Date().toISOString().split('T')[0];

    const stmt = db.prepare(`
      SELECT * FROM api_usage_stats
      WHERE date = ?
      ORDER BY hour ASC
    `);
    const data = stmt.all(today);

    const totals = data.reduce(
      (acc, row) => ({
        requests_total: acc.requests_total + row.requests_total,
        cache_hits: acc.cache_hits + row.cache_hits,
        api_calls: acc.api_calls + row.api_calls,
        errors_count: acc.errors_count + row.errors_count,
      }),
      { requests_total: 0, cache_hits: 0, api_calls: 0, errors_count: 0 }
    );

    return {
      hourly: data,
      totals,
      cacheHitRate: totals.requests_total > 0
        ? ((totals.cache_hits / totals.requests_total) * 100).toFixed(2)
        : 0,
    };
  } catch (error) {
    console.error('Error in getTodayStats:', error);
    return null;
  }
}
