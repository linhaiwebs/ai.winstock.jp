import express from 'express';
import db from '../database/db.js';
import { generateUUID } from '../database/helpers.js';

const router = express.Router();

router.post('/session', async (req, res) => {
  try {
    const { sessionId, stockCode, stockName, urlParams, userAgent } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const existingStmt = db.prepare('SELECT id FROM user_sessions WHERE session_id = ?');
    const existing = existingStmt.get(sessionId);

    if (existing) {
      const updateStmt = db.prepare(`
        UPDATE user_sessions
        SET stock_code = ?, stock_name = ?, url_params = ?, last_activity_at = ?
        WHERE session_id = ?
      `);
      updateStmt.run(
        stockCode || null,
        stockName || null,
        JSON.stringify(urlParams || {}),
        new Date().toISOString(),
        sessionId
      );
    } else {
      const id = generateUUID();
      const insertStmt = db.prepare(`
        INSERT INTO user_sessions
        (id, session_id, stock_code, stock_name, url_params, user_agent)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      insertStmt.run(
        id,
        sessionId,
        stockCode || null,
        stockName || null,
        JSON.stringify(urlParams || {}),
        userAgent || null
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking session:', error);
    res.status(500).json({ error: 'Failed to track session' });
  }
});

router.post('/event', async (req, res) => {
  try {
    const { sessionId, eventType, eventData, stockCode, stockName, durationMs, gclid } = req.body;

    if (!sessionId || !eventType) {
      return res.status(400).json({ error: 'Session ID and event type are required' });
    }

    const updateStmt = db.prepare(`
      UPDATE user_sessions
      SET last_activity_at = ?
      WHERE session_id = ?
    `);
    updateStmt.run(new Date().toISOString(), sessionId);

    if (eventType === 'conversion') {
      const convertStmt = db.prepare(`
        UPDATE user_sessions
        SET converted = 1, converted_at = ?
        WHERE session_id = ?
      `);
      convertStmt.run(new Date().toISOString(), sessionId);
    }

    const id = generateUUID();
    const insertStmt = db.prepare(`
      INSERT INTO user_events
      (id, session_id, event_type, event_data, stock_code, stock_name, duration_ms, gclid)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      id,
      sessionId,
      eventType,
      JSON.stringify(eventData || {}),
      stockCode || null,
      stockName || null,
      durationMs || null,
      gclid || null
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    res.status(500).json({ error: 'Failed to track event' });
  }
});

export default router;
