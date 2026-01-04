import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../database/db.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';
import { getSessionSummary, getPopularStocks } from '../database/helpers.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const stmt = db.prepare('SELECT * FROM admin_users WHERE username = ?');
    const user = stmt.get(username);

    if (!user) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    const updateStmt = db.prepare('UPDATE admin_users SET last_login_at = ? WHERE id = ?');
    updateStmt.run(new Date().toISOString(), user.id);

    const token = generateToken(user.id, user.username);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: '登录失败,请重试' });
  }
});

router.post('/logout', authMiddleware, (req, res) => {
  res.json({ success: true });
});

router.get('/verify', authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const { days = 7, limit = 50, offset = 0 } = req.query;
    const daysBack = parseInt(days);
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    const cutoff = cutoffDate.toISOString();

    const stmt = db.prepare(`
      SELECT * FROM user_sessions
      WHERE first_visit_at >= ?
      ORDER BY first_visit_at DESC
      LIMIT ? OFFSET ?
    `);

    const sessions = stmt.all(cutoff, limitNum, offsetNum);

    const countStmt = db.prepare(`
      SELECT COUNT(*) as total FROM user_sessions
      WHERE first_visit_at >= ?
    `);
    const { total } = countStmt.get(cutoff);

    const sessionsWithEvents = sessions.map(session => {
      const eventsStmt = db.prepare(`
        SELECT * FROM user_events
        WHERE session_id = ?
        ORDER BY created_at ASC
      `);
      const events = eventsStmt.all(session.session_id);

      return {
        ...session,
        url_params: JSON.parse(session.url_params),
        events: events.map(e => ({
          ...e,
          event_data: JSON.parse(e.event_data)
        }))
      };
    });

    res.json({
      sessions: sessionsWithEvents,
      total,
      limit: limitNum,
      offset: offsetNum
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const daysBack = parseInt(days);

    const summary = getSessionSummary(daysBack);
    const popularStocks = getPopularStocks(daysBack, 10);

    res.json({
      summary,
      popularStocks
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
