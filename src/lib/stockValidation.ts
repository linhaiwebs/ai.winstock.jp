import { StockData } from '../types/stock';

export function isStockDataValid(stockData: StockData | null): boolean {
  if (!stockData || !stockData.info) {
    return false;
  }

  const info = stockData.info;

  const hasValidName = info.name && info.name.trim() !== '';
  const hasValidPrice = typeof info.price === 'number' && info.price > 0;
  const hasValidIndustry = info.industry && info.industry.trim() !== '';
  const hasFinancialMetrics = (
    (typeof info.per === 'number' && !isNaN(info.per)) ||
    (typeof info.pbr === 'number' && !isNaN(info.pbr))
  );

  return hasValidName && hasValidPrice && hasValidIndustry && hasFinancialMetrics;
}

export function getRequiredFields(): string[] {
  return ['name', 'price', 'industry', 'per or pbr'];
}
