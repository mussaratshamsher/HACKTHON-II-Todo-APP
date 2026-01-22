// api-client.ts
import { Todo } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// --- Utilities ---
function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) return obj.map(v => snakeToCamel(v));
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, g) => g.toUpperCase());
      acc[camelKey] = snakeToCamel(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

function camelToSnake(obj: any): any {
  if (Array.isArray(obj)) return obj.map(v => camelToSnake(v));
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      acc[snakeKey] = camelToSnake(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

// --- API Client ---
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  setAuthToken(token: string | null) {
    this.setToken(token);
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    let body = options.body;
    if (body && typeof body === 'string') {
      body = JSON.stringify(camelToSnake(JSON.parse(body)));
    }

    const config: RequestInit = {
      ...options,
      body,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) return {} as T;

      const data = await response.json();
      return snakeToCamel(data) as T;
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  async sendAgentCommand(command: string, context: any = {}): Promise<string> {
    const data = await this.request<{ assistantReply: string }>('/agent/command', {
      method: 'POST',
      body: JSON.stringify({ command, context }),
    });

    if (!data.assistantReply) {
      throw new Error('Invalid response format from agent.');
    }

    return data.assistantReply;
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) });
  }

  async put<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// --- Export singleton ---
export const apiClient = new ApiClient();

// --- Named export for agent command ---
export const sendCommandToAgent = (command: string, context: any = {}) =>
  apiClient.sendAgentCommand(command, context);
