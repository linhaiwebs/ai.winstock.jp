import express from 'express';
import dotenv from 'dotenv';
import { getCachedDiagnosis, saveDiagnosisToCache } from '../utils/cache.js';
import { getRateLimitStatus } from '../utils/rateLimiter.js';
import { recordUsageStats } from '../utils/stats.js';

dotenv.config();

const router = express.Router();

router.post('/diagnosis', async (req, res) => {
  const startTime = Date.now();

  try {
    const { code, stockData } = req.body;

    console.log('Diagnosis request received for stock:', code);

    if (!code || !stockData) {
      console.error('Missing required parameters:', { code, hasStockData: !!stockData });
      await recordUsageStats({ cacheHit: false, apiCall: false, error: true, responseTime: Date.now() - startTime });
      return res.status(400).json({ error: 'Stock code and data are required' });
    }

    const cachedResult = await getCachedDiagnosis(code);
    if (cachedResult) {
      console.log(`Returning cached result for ${code}`);
      const responseTime = Date.now() - startTime;
      await recordUsageStats({ cacheHit: true, apiCall: false, error: false, responseTime });
      return res.json({
        analysis: cachedResult.diagnosis_result,
        cached: true,
        cachedAt: cachedResult.created_at,
        expiresAt: cachedResult.expires_at
      });
    }

    const apiKeysString = process.env.SILICONFLOW_API_KEY || process.env.SILICONFLOW_API_KEYS;
    const siliconflowApiUrl = process.env.SILICONFLOW_API_URL || 'https://api.siliconflow.cn/v1/chat/completions';
    const siliconflowModel = process.env.SILICONFLOW_MODEL || 'Qwen/Qwen2.5-7B-Instruct';

    if (!apiKeysString) {
      console.warn('SILICONFLOW_API_KEY not configured, using mock response');

      const mockAnalysis = `【${stockData.name}（${code}）の市場分析】\n\n現在の株価は${stockData.price}円で、前日比${stockData.change}円（${stockData.changePercent}%）の変動となっています。\n\n■ テクニカル指標\nPER: ${stockData.per}倍\nPBR: ${stockData.pbr}倍\n配当利回り: ${stockData.dividend}%\n\n■ 業種分析\n${stockData.industry}セクターに属しており、時価総額は${stockData.marketCap}億円です。\n\n■ 市場動向\n本銘柄は現在の市場環境において、一定の注目を集めています。テクニカル指標から見ると、${parseFloat(stockData.per) > 15 ? "やや割高" : "適正水準"}の評価となっています。\n\n※本分析は情報提供のみを目的としており、投資の推奨や助言ではありません。投資判断は必ずご自身の責任で行ってください。`;

      await saveDiagnosisToCache(code, stockData, mockAnalysis, 'mock');
      const responseTime = Date.now() - startTime;
      await recordUsageStats({ cacheHit: false, apiCall: false, error: false, responseTime });
      return res.json({ analysis: mockAnalysis, cached: false, mock: true });
    }

    const apiKeys = apiKeysString.split(',').map(k => k.trim()).filter(k => k);
    const selectedApiKey = apiKeys[0];

    console.log('SiliconFlow API Key selected, making streaming API request...');
    console.log('Using model:', siliconflowModel);

    const prompt = `あなたは日本の株式市場アナリストです。以下の株式データに基づいて、指定されたフォーマットで診断結果を日本語で作成してください。

株式情報：
銘柄名: ${stockData.name}
コード: ${code}
現在株価: ${stockData.price}円
前日比: ${stockData.change}円 (${stockData.changePercent})
PER: ${stockData.per}倍
PBR: ${stockData.pbr}倍
配当利回り: ${stockData.dividend}%
業種: ${stockData.industry}
時価総額: ${stockData.marketCap}億円

必ず以下のフォーマットで出力してください：

ご入力いただいた ${stockData.name} について、モメンタム分析・リアルタイムデータ・AIロジックをもとに診断を行いました。

現在の株価は ${stockData.price} 円、前日比 ${stockData.change} 円（${stockData.changePercent}）

私たちのスタッフ、「AI 株式 アシスタント」のLINEアカウントを追加してください。

追加が完了しましたら、詳細な診断レポートを受け取るために、銘柄コード「${stockData.name}」または「${code}」と送信してください。

重要: このフォーマットを厳密に守り、他の分析内容は含めないでください。`;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    let siliconflowResponse;
    try {
      siliconflowResponse = await fetch(
        siliconflowApiUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${selectedApiKey}`,
          },
          body: JSON.stringify({
            model: siliconflowModel,
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 1500,
            top_p: 0.7,
            top_k: 50,
            frequency_penalty: 0.5,
            stream: true,
          }),
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('Request timeout after 45 seconds');
        const responseTime = Date.now() - startTime;
        await recordUsageStats({ cacheHit: false, apiCall: true, error: true, responseTime });
        res.write(`data: ${JSON.stringify({ error: 'リクエストがタイムアウトしました。もう一度お試しください。' })}\n\n`);
        res.end();
        return;
      }
      throw fetchError;
    }

    console.log('SiliconFlow API response status:', siliconflowResponse.status);

    if (!siliconflowResponse.ok) {
      const errorBody = await siliconflowResponse.text();
      console.error('SiliconFlow API error response:', errorBody);
      const responseTime = Date.now() - startTime;
      await recordUsageStats({ cacheHit: false, apiCall: true, error: true, responseTime });
      res.write(`data: ${JSON.stringify({ error: `SiliconFlow API error: ${siliconflowResponse.status}` })}\n\n`);
      res.end();
      return;
    }

    let fullAnalysis = '';
    const reader = siliconflowResponse.body;
    const decoder = new TextDecoder();
    let buffer = '';

    for await (const chunk of reader) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split('\n');

      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith('data: ')) {
          const data = trimmedLine.slice(6).trim();

          if (data === '[DONE]') {
            continue;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;

            if (content) {
              fullAnalysis += content;
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          } catch (e) {
            if (data.length > 0) {
              console.error('Error parsing streaming chunk. Data length:', data.length, 'First 200 chars:', data.substring(0, 200));
            }
          }
        }
      }
    }

    decoder.decode();

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();

    console.log('Successfully generated streaming analysis, length:', fullAnalysis.length);

    if (fullAnalysis.trim().length > 0) {
      await saveDiagnosisToCache(code, stockData, fullAnalysis, 'qwen2.5-7b-instruct');
    } else {
      console.warn('Empty analysis result, not caching');
    }

    const responseTime = Date.now() - startTime;
    await recordUsageStats({ cacheHit: false, apiCall: true, error: false, responseTime });

  } catch (error) {
    console.error('Error in diagnosis function:', error);
    console.error('Error stack:', error.stack);

    const responseTime = Date.now() - startTime;
    await recordUsageStats({ cacheHit: false, apiCall: false, error: true, responseTime });

    if (!res.headersSent) {
      res.status(500).json({
        error: '診断中にエラーが発生しました',
        details: error.message,
        type: error.name,
      });
    } else {
      res.write(`data: ${JSON.stringify({ error: '診断中にエラーが発生しました', details: error.message })}\n\n`);
      res.end();
    }
  }
});

router.get('/stats', async (req, res) => {
  try {
    const rateLimitStatus = getRateLimitStatus();
    const { getTodayStats } = await import('../utils/stats.js');
    const todayStats = await getTodayStats();

    res.json({
      rateLimit: rateLimitStatus,
      today: todayStats,
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

export default router;
