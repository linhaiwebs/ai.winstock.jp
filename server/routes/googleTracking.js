import express from 'express';
import db from '../database/db.js';
import { generateUUID } from '../database/helpers.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  });

  try {
    const stmt = db.prepare(`
      SELECT * FROM google_tracking_config
      ORDER BY updated_at DESC
      LIMIT 1
    `);
    const config = stmt.get();

    if (!config) {
      return res.json({
        success: true,
        config: {
          google_ads_conversion_id: '',
          ga4_measurement_id: '',
          conversion_action_id: '',
          is_enabled: false
        }
      });
    }

    res.json({
      success: true,
      config: {
        google_ads_conversion_id: config.google_ads_conversion_id || '',
        ga4_measurement_id: config.ga4_measurement_id || '',
        conversion_action_id: config.conversion_action_id || '',
        is_enabled: config.is_enabled === 1
      }
    });
  } catch (error) {
    console.error('Error fetching Google tracking config:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch configuration' });
  }
});

router.post('/', authMiddleware, (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  try {
    const { google_ads_conversion_id, ga4_measurement_id, conversion_action_id, is_enabled } = req.body;

    const checkStmt = db.prepare('SELECT id FROM google_tracking_config LIMIT 1');
    const existing = checkStmt.get();

    if (existing) {
      const updateStmt = db.prepare(`
        UPDATE google_tracking_config
        SET google_ads_conversion_id = ?,
            ga4_measurement_id = ?,
            conversion_action_id = ?,
            is_enabled = ?,
            updated_at = ?
        WHERE id = ?
      `);

      updateStmt.run(
        google_ads_conversion_id || null,
        ga4_measurement_id || null,
        conversion_action_id || null,
        is_enabled ? 1 : 0,
        new Date().toISOString(),
        existing.id
      );

      const getStmt = db.prepare('SELECT * FROM google_tracking_config WHERE id = ?');
      const config = getStmt.get(existing.id);

      return res.json({ success: true, config });
    }

    const id = generateUUID();
    const insertStmt = db.prepare(`
      INSERT INTO google_tracking_config (id, google_ads_conversion_id, ga4_measurement_id, conversion_action_id, is_enabled)
      VALUES (?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      id,
      google_ads_conversion_id || null,
      ga4_measurement_id || null,
      conversion_action_id || null,
      is_enabled ? 1 : 0
    );

    const getStmt = db.prepare('SELECT * FROM google_tracking_config WHERE id = ?');
    const config = getStmt.get(id);

    res.json({ success: true, config });
  } catch (error) {
    console.error('Error saving Google tracking config:', error);
    res.status(500).json({ success: false, error: 'Failed to save configuration' });
  }
});

export default router;
