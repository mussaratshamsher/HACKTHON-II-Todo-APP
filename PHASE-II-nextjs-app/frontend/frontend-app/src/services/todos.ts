// Todo-specific API functions
import { apiClient } from './api-client';
import { Todo, ApiResponse, PaginatedApiResponse } from './types';

export const getTodos = async (): Promise<Todo[]> => {
  const response: Todo[] = await apiClient.request('/todos');
  return response;
};

export const getTodoById = async (id: string): Promise<Todo> => {
  const response: Todo = await apiClient.request(`/todos/${id}`);
  return response;
};

export const createTodo = async (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>): Promise<Todo> => {
  const response: ApiResponse<Todo> = await apiClient.request('/todos', {
    method: 'POST',
    body: JSON.stringify(todoData),
  });
  return response.data;
};

export const updateTodo = async (id: string, todoData: Partial<Todo>): Promise<Todo> => {
  const response: ApiResponse<Todo> = await apiClient.request(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todoData),
  });
  return response.data;
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  const response: { success: boolean } = await apiClient.request(`/todos/${id}`, {
    method: 'DELETE',
  });
  return response.success;
};

export const toggleTodo = async (id: string): Promise<Todo> => {
  const currentTodo = await getTodoById(id);
  const response: ApiResponse<Todo> = await apiClient.request(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...currentTodo, completed: !currentTodo.completed }),
  });
  return response.data;
};