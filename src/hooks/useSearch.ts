import { useState, useCallback } from 'react';
import { searchAPI } from '../services/api/search';
import { FALLBACK_ERROR_MESSAGE } from '../config/api.config';
import type { Industry } from '../config/industries';

interface UseSearchOptions {
  industry: Industry;
  context?: string;
}

export function useSearch({ industry, context }: UseSearchOptions) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchAPI({
        query: query.trim(),
        industry,
        context
      });
      
      setResult(response.text);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : FALLBACK_ERROR_MESSAGE;
      setError(errorMessage);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [query, industry, context]);

  return {
    query,
    setQuery,
    isLoading,
    result,
    error,
    handleSearch
  };
}