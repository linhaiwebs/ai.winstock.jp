import { useState, useEffect } from 'react';
import { StockListItem } from '../types/stock';

export function useStockList() {
  const [stocks, setStocks] = useState<StockListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStockList = async () => {
      try {
        const response = await fetch('/stock.json');
        if (!response.ok) {
          throw new Error('Failed to load stock list');
        }
        const data = await response.json();
        setStocks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading stock list:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    loadStockList();
  }, []);

  return { stocks, loading, error };
}
