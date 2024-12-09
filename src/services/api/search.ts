import { API_CONFIG, FALLBACK_ERROR_MESSAGE } from '../../config/api.config';
import type { Industry } from '../../config/industries';
import type { SearchResponse } from '../../types/search';

interface SearchParams {
  query: string;
  industry: Industry;
  context?: string;
}

export async function searchAPI({ query, industry, context }: SearchParams): Promise<SearchResponse> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_CONFIG.timeouts.search);

    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.search}`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({
        query,
        industry,
        context,
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || typeof data.text !== 'string') {
      throw new Error('Invalid response format');
    }

    return {
      text: data.text,
      created: Date.now(),
      done: true
    };
  } catch (error) {
    console.error('Search API Error:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw new Error(error.message);
    }
    
    throw new Error(FALLBACK_ERROR_MESSAGE);
  }
}