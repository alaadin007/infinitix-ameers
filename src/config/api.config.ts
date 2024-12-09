export const API_CONFIG = {
  baseUrl: 'https://api.infinitixglobal.com',
  endpoints: {
    search: '/search'
  },
  headers: {
    'Content-Type': 'application/json'
  },
  timeouts: {
    search: 30000 // 30 seconds
  }
} as const;

export const FALLBACK_ERROR_MESSAGE = 'An unexpected error occurred. Please try again.';