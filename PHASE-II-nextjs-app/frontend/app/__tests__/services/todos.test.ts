// Unit tests for the Todo service functions
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo, toggleTodo } from '@/services/todos';
import { apiClient } from '@/services/api-client';

// Mock the apiClient module
jest.mock('@/services/api-client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Todo Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should fetch todos successfully', async () => {
      const mockResponse = {
        data: [
          {
            id: '1',
            title: 'Test Todo',
            description: 'Test Description',
            completed: false,
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
          },
        ],
        meta: {
          totalCount: 1,
          currentPage: 1,
          totalPages: 1,
        },
      };

      (apiClient.get as jest.MockedFunction<any>).mockResolvedValue(mockResponse);

      const result = await getTodos();

      expect(apiClient.get).toHaveBeenCalledWith('/todos');
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors when fetching todos', async () => {
      const errorMessage = 'Network error';
      (apiClient.get as jest.MockedFunction<any>).mockRejectedValue(new Error(errorMessage));

      await expect(getTodos()).rejects.toThrow(errorMessage);
    });
  });

  describe('getTodoById', () => {
    it('should fetch a single todo by ID', async () => {
      const todoId = '1';
      const mockResponse = {
        data: {
          id: todoId,
          title: 'Test Todo',
          description: 'Test Description',
          completed: false,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
      };

      (apiClient.get as jest.MockedFunction<any>).mockResolvedValue(mockResponse);

      const result = await getTodoById(todoId);

      expect(apiClient.get).toHaveBeenCalledWith(`/todos/${todoId}`);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const newTodoData = {
        title: 'New Todo',
        description: 'New Description',
      };
      const mockResponse = {
        data: {
          id: '2',
          ...newTodoData,
          completed: false,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
      };

      (apiClient.post as jest.MockedFunction<any>).mockResolvedValue(mockResponse);

      const result = await createTodo(newTodoData);

      expect(apiClient.post).toHaveBeenCalledWith('/todos', newTodoData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateTodo', () => {
    it('should update an existing todo', async () => {
      const todoId = '1';
      const updateData = {
        title: 'Updated Title',
        completed: true,
      };
      const mockResponse = {
        data: {
          id: todoId,
          title: 'Updated Title',
          description: 'Original Description',
          completed: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-02T00:00:00Z',
        },
      };

      (apiClient.put as jest.MockedFunction<any>).mockResolvedValue(mockResponse);

      const result = await updateTodo(todoId, updateData);

      expect(apiClient.put).toHaveBeenCalledWith(`/todos/${todoId}`, updateData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('toggleTodo', () => {
    it('should toggle the completion status of a todo', async () => {
      const todoId = '1';
      const mockResponse = {
        data: {
          id: todoId,
          title: 'Test Todo',
          description: 'Test Description',
          completed: true,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-02T00:00:00Z',
        },
      };

      (apiClient.patch as jest.MockedFunction<any>).mockResolvedValue(mockResponse);

      const result = await toggleTodo(todoId);

      expect(apiClient.patch).toHaveBeenCalledWith(`/todos/${todoId}/toggle`);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const todoId = '1';
      const mockResponse = {
        success: true,
      };

      (apiClient.delete as jest.MockedFunction<any>).mockResolvedValue(mockResponse);

      const result = await deleteTodo(todoId);

      expect(apiClient.delete).toHaveBeenCalledWith(`/todos/${todoId}`);
      expect(result).toEqual(mockResponse);
    });
  });
});