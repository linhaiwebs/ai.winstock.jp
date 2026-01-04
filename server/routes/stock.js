import express from 'express';

const router = express.Router();

function parseStockInfo(html) {
  try {
    const codeMatch = html.match(/<h2><span class="inline-block">(\d+)<\/span>/);
    const nameMatch = html.match(/<h2><span class="inline-block">\d+<\/span><span class="fs0">　<\/span>([^<]+)<\/h2>/);
    const marketMatch = html.match(/<span class="market">([^<]+)<\/span>/);
    const timeMatch = html.match(/<time datetime="([^"]+)">([^<]+)<\/time>/);
    const priceMatch = html.match(/<span class="kabuka">([0-9,]+(?:\.[0-9]+)?)円<\/span>/);
    const changeMatch = html.match(/<dt>前日比<\/dt>\s*<dd><span class="(up|down)">([^<]+)<\/span><\/dd>\s*<dd><span class="(?:up|down)">([^<]+)<\/span>/);
    const ptsMatch = html.match(/<div class="kabuka2">([0-9,]+)円<\/div>\s*<div class="kabuka3">([^<]+)<\/div>/);
    const industryMatch = html.match(/<a href="\/themes\/\?industry=[^"]+">([^<]+)<\/a>/);
    const unitMatch = html.match(/<dt>単位<\/dt>\s*<dd>([^<]+)<\/dd>/);
    const perMatch = html.match(/<td>([0-9.]+)<span class="fs9">倍<\/span><\/td>/);
    const pbrMatch = html.match(/<td>([0-9.]+)<span class="fs9">倍<\/span><\/td>[\s\S]*?<td>([0-9.]+)<span class="fs9">倍<\/span><\/td>/);
    const dividendMatch = html.match(/<td>([0-9.]+)<span class="fs9">％<\/span><\/td>/);
    const creditMatch = html.match(/<td>([0-9.]+)<span class="fs9">倍<\/span><\/td>\s*<\/tr>/);
    const marketCapMatch = html.match(/<td colspan="2" class="v_zika2">([0-9,]+)<span>億円<\/span><\/td>/);
    const earningsMatch = html.match(/<time datetime="([^"]+)">([^<]+)<\/time>/);

    if (!codeMatch || !nameMatch || !priceMatch) {
      return null;
    }

    return {
      code: codeMatch[1],
      name: nameMatch[1],
      market: marketMatch ? marketMatch[1] : '',
      price: priceMatch[1],
      change: changeMatch ? changeMatch[2] : '0',
      changePercent: changeMatch ? changeMatch[3] : '0',
      timestamp: timeMatch ? timeMatch[2] : '',
      ptsPrice: ptsMatch ? ptsMatch[1] : undefined,
      ptsTime: ptsMatch ? ptsMatch[2] : undefined,
      industry: industryMatch ? industryMatch[1] : '',
      unit: unitMatch ? unitMatch[1].trim() : '',
      per: perMatch ? perMatch[1] : '',
      pbr: pbrMatch ? pbrMatch[2] : '',
      dividend: dividendMatch ? dividendMatch[1] : '',
      creditRatio: creditMatch ? creditMatch[1] : '',
      marketCap: marketCapMatch ? marketCapMatch[1] : '',
      earningsDate: earningsMatch ? earningsMatch[2] : undefined,
    };
  } catch (error) {
    console.error('Error parsing stock info:', error);
    return null;
  }
}

function parseStockPrices(html) {
  const prices = [];

  try {
    const tableMatch = html.match(/<table class="stock_kabuka_dwm">[\s\S]*?<\/table>/);
    if (!tableMatch) return prices;

    const rowRegex = /<tr>\s*<th scope="row"><time datetime="([^"]+)">([^<]+)<\/time><\/th>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td><span class="(up|down)?">([^<]+)<\/span><\/td>\s*<td><span class="(?:up|down)?">([^<]+)<\/span><\/td>\s*<td>([0-9,]+)<\/td>/g;

    let match;
    while ((match = rowRegex.exec(tableMatch[0])) !== null) {
      prices.push({
        date: match[2],
        open: match[3],
        high: match[4],
        low: match[5],
        close: match[6],
        change: match[8],
        changePercent: match[9],
        volume: match[10],
      });
    }

    const todayMatch = html.match(/<table class="stock_kabuka0">[\s\S]*?<tr>\s*<th scope="row"><time datetime="([^"]+)">([^<]+)<\/time><\/th>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td><span class="(up|down)?">([^<]+)<\/span><\/td>\s*<td><span class="(?:up|down)?">([^<]+)<\/span><\/td>\s*<td>([0-9,]+)<\/td>/);

    if (todayMatch) {
      prices.unshift({
        date: todayMatch[2],
        open: todayMatch[3],
        high: todayMatch[4],
        low: todayMatch[5],
        close: todayMatch[6],
        change: todayMatch[8],
        changePercent: todayMatch[9],
        volume: todayMatch[10],
      });
    }
  } catch (error) {
    console.error('Error parsing stock prices:', error);
  }

  return prices;
}

router.get('/data', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Stock code is required' });
    }

    const stockUrl = `https://kabutan.jp/stock/kabuka?code=${code}`;
    const response = await fetch(stockUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch stock data' });
    }

    const html = await response.text();
    const stockInfo = parseStockInfo(html);
    const stockPrices = parseStockPrices(html);

    if (!stockInfo) {
      return res.status(500).json({ error: 'Failed to parse stock data' });
    }

    const data = {
      info: stockInfo,
      prices: stockPrices,
    };

    res.json(data);
  } catch (error) {
    console.error('Error in stock data endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

export default router;
