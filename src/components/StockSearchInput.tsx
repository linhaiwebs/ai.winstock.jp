import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { StockListItem } from '../types/stock';
import { useStockList } from '../hooks/useStockList';

interface StockSearchInputProps {
  onSelectStock: (stockCode: string) => void;
  currentStockCode?: string;
  onSearchChange?: (query: string) => void;
}

const ITEMS_PER_PAGE = 5;

export default function StockSearchInput({ onSelectStock, currentStockCode, onSearchChange }: StockSearchInputProps) {
  const { stocks, loading } = useStockList();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredStocks = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return stocks.filter((stock) => {
      const nameMatch = stock.name.toLowerCase().includes(query);
      const descriptionMatch = stock.description.toLowerCase().includes(query);
      return nameMatch || descriptionMatch;
    });
  }, [stocks, searchQuery]);

  const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageItems = filteredStocks.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(value.trim().length > 0);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSelectStock = (stock: StockListItem) => {
    const stockCode = stock.name;
    if (stockCode !== currentStockCode) {
      onSelectStock(stockCode);
    }
    setSearchQuery(stockCode);
    setIsDropdownOpen(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Enter') {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery) {
        if (currentPageItems.length > 0) {
          handleSelectStock(currentPageItems[0]);
        } else {
          onSelectStock(trimmedQuery);
          setIsDropdownOpen(false);
        }
      }
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-blue-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="株式コードまたは銘柄名で検索..."
          disabled={loading}
          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-blue-500/30 rounded-2xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-lg"
        />
      </div>

      {isDropdownOpen && currentPageItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden z-[9999]">
          <div className="max-h-[400px] overflow-y-auto">
            {currentPageItems.map((stock, index) => (
              <button
                key={`${stock.name}-${index}`}
                onClick={() => handleSelectStock(stock)}
                className="w-full px-6 py-4 text-left hover:bg-blue-600/20 transition-colors duration-200 border-b border-blue-800/20 last:border-b-0 group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-600/30 text-blue-300 text-sm font-mono font-semibold group-hover:bg-blue-600/50 transition-colors">
                      {stock.name}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate group-hover:text-blue-200 transition-colors">
                      {stock.description}
                    </p>
                    <p className="text-blue-400/60 text-sm mt-1">
                      {stock.exchange}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 bg-slate-800/50 border-t border-blue-700/30 flex items-center justify-between">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">前へ</span>
              </button>

              <span className="text-blue-200 text-sm font-medium">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span className="text-sm font-medium">次へ</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {isDropdownOpen && searchQuery.trim() && currentPageItems.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden z-[9999]">
          <div className="px-6 py-8 text-center">
            <p className="text-blue-300/70">検索結果が見つかりませんでした</p>
          </div>
        </div>
      )}
    </div>
  );
}
