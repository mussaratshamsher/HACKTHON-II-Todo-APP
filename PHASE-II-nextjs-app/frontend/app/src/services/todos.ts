// Todo-specific API functions
import { apiClient } from './api-client';
import { 
  TodoListResponse, 
  TodoResponse, 
  CreateTodoRequest, 
  UpdateTodoRequest, 
  ToggleTodoResponse,
  DeleteTodoResponse
} from './types';

export const getTodos = async (): Promise<TodoListResponse> => {
  return await apiClient.get('/todos');
};

export const getTodoById = async (id: string): Promise<TodoResponse> => {
  return await apiClient.get(`/todos/${id}`);
};

export const createTodo = async (data: CreateTodoRequest): Promise<TodoResponse> => {
  return await apiClient.post('/todos', data);
};

export const updateTodo = async (id: string, data: UpdateTodoRequest): Promise<TodoResponse> => {
  return await apiClient.put(`/todos/${id}`, data);
};

export const toggleTodo = async (id: string): Promise<ToggleTodoResponse> => {
  return await apiClient.patch(`/todos/${id}/toggle`);
};

export const deleteTodo = async (id: string): Promise<DeleteTodoResponse> => {
  return await apiClient.delete(`/todos/${id}`);
};