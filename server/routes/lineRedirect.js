import express from 'express';
import db from '../database/db.js';
import { generateUUID } from '../database/helpers.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

function isValidUrl(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
}

router.get('/', authMiddleware, (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  });

  try {
    const stmt = db.prepare(`
      SELECT * FROM redirect_links
      ORDER BY is_active DESC, weight DESC, created_at DESC
    `);
    const links = stmt.all();

    res.json({ success: true, links });
  } catch (error) {
    console.error('Error fetching redirect links:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch links' });
  }
});

router.post('/', authMiddleware, (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  try {
    const { redirect_url, weight, label, url_type } = req.body;

    if (!redirect_url || !isValidUrl(redirect_url)) {
      return res.status(400).json({ success: false, error: 'Invalid URL format. Please provide a valid http or https URL.' });
    }

    if (weight < 1 || weight > 100) {
      return res.status(400).json({ success: false, error: 'Weight must be between 1 and 100' });
    }

    const checkDuplicateStmt = db.prepare('SELECT id FROM redirect_links WHERE redirect_url = ?');
    const existingLink = checkDuplicateStmt.get(redirect_url);

    if (existingLink) {
      return res.status(400).json({ success: false, error: 'This URL already exists' });
    }

    const id = generateUUID();
    const finalLabel = label || '';
    const finalUrlType = url_type || 'general';

    const stmt = db.prepare(`
      INSERT INTO redirect_links (id, redirect_url, weight, label, url_type)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(id, redirect_url, weight, finalLabel, finalUrlType);

    const getStmt = db.prepare('SELECT * FROM redirect_links WHERE id = ?');
    const newLink = getStmt.get(id);

    res.json({ success: true, link: newLink });
  } catch (error) {
    console.error('Error creating redirect link:', error);
    res.status(500).json({ success: false, error: 'Failed to create link' });
  }
});

router.put('/:id', authMiddleware, (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  try {
    const { id } = req.params;
    const { redirect_url, weight, is_active, label, url_type } = req.body;

    if (redirect_url && !isValidUrl(redirect_url)) {
      return res.status(400).json({ success: false, error: 'Invalid URL format. Please provide a valid http or https URL.' });
    }

    if (weight !== undefined && (weight < 1 || weight > 100)) {
      return res.status(400).json({ success: false, error: 'Weight must be between 1 and 100' });
    }

    const updates = [];
    const values = [];

    if (redirect_url !== undefined) {
      const checkDuplicateStmt = db.prepare('SELECT id FROM redirect_links WHERE redirect_url = ? AND id != ?');
      const existingLink = checkDuplicateStmt.get(redirect_url, id);

      if (existingLink) {
        return res.status(400).json({ success: false, error: 'This URL already exists' });
      }

      updates.push('redirect_url = ?');
      values.push(redirect_url);
    }
    if (weight !== undefined) {
      updates.push('weight = ?');
      values.push(weight);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      values.push(is_active ? 1 : 0);
    }
    if (label !== undefined) {
      updates.push('label = ?');
      values.push(label);
    }
    if (url_type !== undefined) {
      updates.push('url_type = ?');
      values.push(url_type);
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, error: 'No fields to update' });
    }

    updates.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(id);

    const stmt = db.prepare(`
      UPDATE redirect_links
      SET ${updates.join(', ')}
      WHERE id = ?
    `);

    stmt.run(...values);

    const getStmt = db.prepare('SELECT * FROM redirect_links WHERE id = ?');
    const updatedLink = getStmt.get(id);

    res.json({ success: true, link: updatedLink });
  } catch (error) {
    console.error('Error updating redirect link:', error);
    res.status(500).json({ success: false, error: 'Failed to update link' });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  try {
    const { id } = req.params;

    const stmt = db.prepare('DELETE FROM redirect_links WHERE id = ?');
    stmt.run(id);

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting redirect link:', error);
    res.status(500).json({ success: false, error: 'Failed to delete link' });
  }
});

router.get('/select', async (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT * FROM redirect_links
      WHERE is_active = 1
      ORDER BY weight DESC
    `);
    const activeLinks = stmt.all();

    if (activeLinks.length === 0) {
      return res.status(404).json({ success: false, error: 'No active links available' });
    }

    const totalWeight = activeLinks.reduce((sum, link) => sum + link.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedLink = activeLinks[0];

    for (const link of activeLinks) {
      random -= link.weight;
      if (random <= 0) {
        selectedLink = link;
        break;
      }
    }

    const updateStmt = db.prepare(`
      UPDATE redirect_links
      SET hit_count = hit_count + 1
      WHERE id = ?
    `);
    updateStmt.run(selectedLink.id);

    res.json({ success: true, link: selectedLink });
  } catch (error) {
    console.error('Error selecting redirect link:', error);
    res.status(500).json({ success: false, error: 'Failed to select link' });
  }
});

export default router;
