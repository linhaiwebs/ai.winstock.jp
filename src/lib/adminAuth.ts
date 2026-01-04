import { apiClient } from './apiClient';

export interface AdminSession {
  user: {
    id: string;
    username: string;
  };
  isAdmin: boolean;
}

function setAuthToken(token: string): void {
  localStorage.setItem('admin_token', token);
}

function clearAuthToken(): void {
  localStorage.removeItem('admin_token');
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || 'Request failed');
  }
  return response.json();
}

export const adminAuth = {
  async login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.post('/api/admin/login', { username, password });
      const data = await handleResponse<{ success: boolean; token: string; error?: string }>(response);

      if (data.success && data.token) {
        setAuthToken(data.token);
        return { success: true };
      }

      return { success: false, error: data.error || '登录失败' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error instanceof Error ? error.message : '登录失败,请重试' };
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/api/admin/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthToken();
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await apiClient.get('/api/admin/verify');
      const data = await handleResponse<{ success: boolean }>(response);
      return data.success;
    } catch {
      return false;
    }
  },

  async getSession(): Promise<AdminSession | null> {
    try {
      const response = await apiClient.get('/api/admin/verify');
      const data = await handleResponse<{ success: boolean; user: any }>(response);
      if (data.success && data.user) {
        return {
          user: data.user,
          isAdmin: true
        };
      }
      return null;
    } catch {
      return null;
    }
  },

  async getCurrentUser() {
    try {
      const response = await apiClient.get('/api/admin/verify');
      const data = await handleResponse<{ success: boolean; user: any }>(response);
      return data.success ? data.user : null;
    } catch {
      return null;
    }
  }
};
