import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import stockRouter from './routes/stock.js';
import geminiRouter from './routes/gemini.js';
import adminRouter from './routes/admin.js';
import trackingRouter from './routes/tracking.js';
import lineRedirectRouter from './routes/lineRedirect.js';
import googleTrackingRouter from './routes/googleTracking.js';
import { initializeDatabase, createInitialAdminUser, migrateLineRedirectLinks } from './database/schema.js';
import { cleanExpiredCache } from './utils/cache.js';

dotenv.config();

initializeDatabase();
migrateLineRedirectLinks();
await createInitialAdminUser();

setInterval(async () => {
  console.log('Running scheduled cache cleanup...');
  await cleanExpiredCache();
}, 60 * 60 * 1000);

function validateApiConfiguration() {
  const apiKey = process.env.SILICONFLOW_API_KEY || process.env.SILICONFLOW_API_KEYS;

  if (!apiKey) {
    console.warn('\u26a0\ufe0f  WARNING: SILICONFLOW_API_KEY is not configured!');
    console.warn('   AI diagnosis will use mock responses.');
    console.warn('   Please set SILICONFLOW_API_KEY in your .env file.');
    return false;
  }

  if (apiKey === 'your_siliconflow_api_key_here' || apiKey.includes('placeholder')) {
    console.warn('\u26a0\ufe0f  WARNING: SILICONFLOW_API_KEY appears to be a placeholder!');
    console.warn('   Current value:', apiKey.substring(0, 20) + '...');
    console.warn('   AI diagnosis will use mock responses.');
    console.warn('   Please replace with your actual SiliconFlow API key.');
    return false;
  }

  console.log('\u2705 SiliconFlow API key configured successfully');
  console.log('   Key preview:', apiKey.substring(0, 10) + '...');
  return true;
}

validateApiConfiguration();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.API_PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const TRUST_PROXY = process.env.TRUST_PROXY === 'true';

if (TRUST_PROXY) {
  app.set('trust proxy', 1);
}

const corsOptions = {
  origin: CORS_ORIGIN ? CORS_ORIGIN.split(',').map(o => o.trim()) : '*',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/stock', stockRouter);
app.use('/api/gemini', geminiRouter);
app.use('/api/admin', adminRouter);
app.use('/api/tracking', trackingRouter);
app.use('/api/line-redirects', lineRedirectRouter);
app.use('/api/google-tracking', googleTrackingRouter);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

if (NODE_ENV === 'production') {
  const distPath = join(__dirname, '..', 'dist');

  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });

  console.log(`📦 Serving static files from: ${distPath}`);
}

app.listen(PORT, () => {
  console.log(`🚀 服务启动与 http://localhost:${PORT}`);
  console.log(`📊 股票API: http://localhost:${PORT}/api/stock`);
  console.log(`🤖 LLM模型API: http://localhost:${PORT}/api/gemini`);
  console.log(`🌍 Environment: ${NODE_ENV}`);

  if (NODE_ENV === 'production') {
    console.log(`✨ Frontend available at: http://localhost:${PORT}`);
  }
});
