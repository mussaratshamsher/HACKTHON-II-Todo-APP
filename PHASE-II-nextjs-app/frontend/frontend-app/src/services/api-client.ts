// Base API client with environment configuration
import { Todo } from './types';
import { useAuth } from '@/context/AuthContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// Utility function to convert snake_case keys to camelCase
function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => snakeToCamel(v));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      acc[camelKey] = snakeToCamel(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

const createApiClient = () => {
  const { getToken } = useAuth();

  class ApiClient {
    private baseUrl: string;

    constructor() {
      this.baseUrl = API_BASE_URL;
    }

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
      const url = `${this.baseUrl}${endpoint}`;
      const token = await getToken();

      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
          return {} as T; 
        }
        
        const data = await response.json();
        const camelCaseData = snakeToCamel(data);
        console.log('API Response (camelCase):', camelCaseData); 
        return camelCaseData as T;
      } catch (error) {
        console.error(`API request failed: ${url}`, error);
        throw error;
      }
    }
  }

  return new ApiClient();
};

export const apiClient = createApiClient();

export async function sendCommandToAgent(command: string): Promise<string> {
  const AGENT_API_URL = 'http://127.0.0.1:8000/api/agent/command';

  try {
    const response = await fetch(AGENT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({ command, context: {} }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const data = await response.json();
    if (!data.assistant_reply) {
      throw new Error("Invalid response format from agent.");
    }

    return data.assistant_reply;
  } catch (error) {
    console.error(`Agent API request failed: ${AGENT_API_URL}`, error);
    throw error;
  }
}