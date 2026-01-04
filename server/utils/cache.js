import db from '../database/db.js';
import { generateUUID } from '../database/helpers.js';

const CACHE_DURATION_HOURS = 4;

export async function getCachedDiagnosis(stockCode) {
  try {
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      SELECT * FROM diagnosis_cache
      WHERE stock_code = ? AND expires_at > ?
      ORDER BY created_at DESC
      LIMIT 1
    `);
    const data = stmt.get(stockCode, now);

    if (data) {
      const updateStmt = db.prepare(`
        UPDATE diagnosis_cache
        SET hit_count = hit_count + 1, last_hit_at = ?
        WHERE id = ?
      `);
      updateStmt.run(new Date().toISOString(), data.id);

      console.log(`Cache hit for stock ${stockCode}, hit_count: ${data.hit_count + 1}`);

      return {
        ...data,
        stock_data: JSON.parse(data.stock_data)
      };
    }

    console.log(`Cache miss for stock ${stockCode}`);
    return null;
  } catch (error) {
    console.error('Error in getCachedDiagnosis:', error);
    return null;
  }
}

export async function saveDiagnosisToCache(stockCode, stockData, diagnosisResult, modelUsed = 'qwen2.5-7b-instruct') {
  try {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + CACHE_DURATION_HOURS);

    const id = generateUUID();
    const stmt = db.prepare(`
      INSERT INTO diagnosis_cache (id, stock_code, stock_data, diagnosis_result, model_used, expires_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      stockCode,
      JSON.stringify(stockData),
      diagnosisResult,
      modelUsed,
      expiresAt.toISOString()
    );

    console.log(`Saved diagnosis to cache for stock ${stockCode}, expires at ${expiresAt.toISOString()}`);
    return { id };
  } catch (error) {
    console.error('Error in saveDiagnosisToCache:', error);
    return null;
  }
}

export async function cleanExpiredCache() {
  try {
    const now = new Date().toISOString();
    const stmt = db.prepare('DELETE FROM diagnosis_cache WHERE expires_at < ?');
    const result = stmt.run(now);
    console.log(`Cleaned ${result.changes} expired cache entries`);
    return true;
  } catch (error) {
    console.error('Error in cleanExpiredCache:', error);
    return false;
  }
}

export async function getCacheStats() {
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
    console.error('Error in getCacheStats:', error);
    return null;
  }
}
