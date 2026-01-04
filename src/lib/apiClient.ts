const getApiBaseUrl = (): string => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const useProxy = import.meta.env.VITE_USE_PROXY === 'true';

  if (useProxy || !apiUrl || apiUrl === '') {
    return '';
  }

  return apiUrl;
};

export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();

  if (!endpoint.startsWith('/')) {
    endpoint = `/${endpoint}`;
  }

  if (baseUrl === '') {
    return endpoint;
  }

  return `${baseUrl}${endpoint}`;
};

const getAuthToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

const buildHeaders = (additionalHeaders?: HeadersInit): HeadersInit => {
  const headers: Record<string, string> = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  if (additionalHeaders) {
    Object.entries(additionalHeaders).forEach(([key, value]) => {
      if (typeof value === 'string') {
        headers[key] = value;
      }
    });
  }

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const apiClient = {
  async get(endpoint: string, options?: RequestInit) {
    const url = buildApiUrl(endpoint);
    const response = await fetch(url, {
      ...options,
      method: 'GET',
      headers: buildHeaders(options?.headers),
      cache: 'no-store',
    });
    return response;
  },

  async post(endpoint: string, data?: unknown, options?: RequestInit) {
    const url = buildApiUrl(endpoint);
    const response = await fetch(url, {
      ...options,
      method: 'POST',
      headers: buildHeaders({
        'Content-Type': 'application/json',
        ...options?.headers,
      }),
      body: data ? JSON.stringify(data) : undefined,
      cache: 'no-store',
    });
    return response;
  },

  async put(endpoint: string, data?: unknown, options?: RequestInit) {
    const url = buildApiUrl(endpoint);
    const response = await fetch(url, {
      ...options,
      method: 'PUT',
      headers: buildHeaders({
        'Content-Type': 'application/json',
        ...options?.headers,
      }),
      body: data ? JSON.stringify(data) : undefined,
      cache: 'no-store',
    });
    return response;
  },

  async delete(endpoint: string, options?: RequestInit) {
    const url = buildApiUrl(endpoint);
    const response = await fetch(url, {
      ...options,
      method: 'DELETE',
      headers: buildHeaders(options?.headers),
      cache: 'no-store',
    });
    return response;
  },
};

export const getApiConfig = () => {
  return {
    baseUrl: getApiBaseUrl(),
    useProxy: import.meta.env.VITE_USE_PROXY === 'true',
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV,
  };
};
