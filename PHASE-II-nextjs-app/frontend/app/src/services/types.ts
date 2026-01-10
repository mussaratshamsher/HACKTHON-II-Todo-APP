// Shared TypeScript types for the Todo application

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
}

export interface TodoListResponse {
  data: Todo[];
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface TodoResponse {
  data: Todo;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface ToggleTodoResponse {
  data: Todo;
}

export interface DeleteTodoResponse {
  success: boolean;
}