'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/services/types';
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo } from '@/services/todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await getTodos();
        setTodos(response.data);
      } catch (err) {
        setError('Failed to load todos');
        console.error('Error fetching todos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (title: string, description?: string) => {
    try {
      const response = await createTodo({ title, description });
      setTodos([response.data, ...todos]);
      return response.data;
    } catch (err) {
      console.error('Error creating todo:', err);
      throw err;
    }
  };

  const updateTodoData = async (id: string, data: Partial<Todo>) => {
    try {
      const response = await updateTodo(id, data);
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      return response.data;
    } catch (err) {
      console.error('Error updating todo:', err);
      throw err;
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      throw err;
    }
  };

  const toggleTodoStatus = async (id: string) => {
    try {
      const response = await toggleTodo(id);
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      return response.data;
    } catch (err) {
      console.error('Error toggling todo:', err);
      throw err;
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodoData,
    removeTodo,
    toggleTodoStatus,
    refetch: () => {
      // Re-fetch todos
      const fetchTodos = async () => {
        try {
          setLoading(true);
          const response = await getTodos();
          setTodos(response.data);
        } catch (err) {
          setError('Failed to load todos');
          console.error('Error fetching todos:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchTodos();
    }
  };
};