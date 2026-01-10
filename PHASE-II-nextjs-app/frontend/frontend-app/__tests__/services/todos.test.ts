// Unit tests for service functions
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo } from '@/services/todos';
import { apiClient } from '@/services/api-client';

// Mock the apiClient
jest.mock('@/services/api-client', () => ({
  apiClient: {
    request: jest.fn(),
  },
}));

describe('Todos Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should fetch todos successfully', async () => {
      const mockTodos = [
        { id: '1', title: 'Test Todo', completed: false, createdAt: '2023-01-01', updatedAt: '2023-01-01' },
      ];
      (apiClient.request as jest.MockedFunction<any>).mockResolvedValue({
        data: mockTodos,
        meta: { totalCount: 1, currentPage: 1, totalPages: 1 },
      });

      const result = await getTodos();

      expect(apiClient.request).toHaveBeenCalledWith('/todos');
      expect(result).toEqual(mockTodos);
    });

    it('should handle errors when fetching todos', async () => {
      const errorMessage = 'Network error';
      (apiClient.request as jest.MockedFunction<any>).mockRejectedValue(new Error(errorMessage));

      await expect(getTodos()).rejects.toThrow(errorMessage);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo successfully', async () => {
      const newTodo = { title: 'New Todo', description: 'Description' };
      const createdTodo = { id: '1', ...newTodo, completed: false, createdAt: '2023-01-01', updatedAt: '2023-01-01' };
      (apiClient.request as jest.MockedFunction<any>).mockResolvedValue({ data: createdTodo });

      const result = await createTodo(newTodo);

      expect(apiClient.request).toHaveBeenCalledWith('/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
      });
      expect(result).toEqual(createdTodo);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo successfully', async () => {
      const id = '1';
      const updateData = { title: 'Updated Title' };
      const updatedTodo = { id, title: 'Updated Title', completed: false, createdAt: '2023-01-01', updatedAt: '2023-01-02' };
      (apiClient.request as jest.MockedFunction<any>).mockResolvedValue({ data: updatedTodo });

      const result = await updateTodo(id, updateData);

      expect(apiClient.request).toHaveBeenCalledWith(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });
      expect(result).toEqual(updatedTodo);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo successfully', async () => {
      const id = '1';
      (apiClient.request as jest.MockedFunction<any>).mockResolvedValue({ success: true });

      const result = await deleteTodo(id);

      expect(apiClient.request).toHaveBeenCalledWith(`/todos/${id}`, {
        method: 'DELETE',
      });
      expect(result).toBe(true);
    });
  });

  describe('toggleTodo', () => {
    it('should toggle a todo successfully', async () => {
      const id = '1';
      const toggledTodo = { id, title: 'Test Todo', completed: true, createdAt: '2023-01-01', updatedAt: '2023-01-02' };
      (apiClient.request as jest.MockedFunction<any>).mockResolvedValue({ data: toggledTodo });

      const result = await toggleTodo(id);

      expect(apiClient.request).toHaveBeenCalledWith(`/todos/${id}/toggle`, {
        method: 'PATCH',
      });
      expect(result).toEqual(toggledTodo);
    });
  });
});