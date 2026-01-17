// Todo-specific API functions
import { apiClient } from './api-client';
import { Todo } from './types';

export const getTodos = async (): Promise<Todo[]> => {
  const response: Todo[] = await apiClient.request('/todos');
  return response;
};

export const getTodoById = async (id: number): Promise<Todo> => {
  const response: Todo = await apiClient.request(`/todos/${id}`);
  return response;
};

export const createTodo = async (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>): Promise<Todo> => {
  const response: Todo = await apiClient.request('/todos', {
    method: 'POST',
    body: JSON.stringify(todoData),
  });
  return response;
};

export const updateTodo = async (id: number, todoData: Partial<Todo>): Promise<Todo> => {
  const response: Todo = await apiClient.request(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todoData),
  });
  return response;
};

export const deleteTodo = async (id: number): Promise<boolean> => {
  await apiClient.request(`/todos/${id}`, {
    method: 'DELETE',
  });
  return true;
};

export const toggleTodo = async (id: number, completed: boolean): Promise<Todo> => {
  const response: Todo = await apiClient.request(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed: !completed }),
  });
  return response;
};