// TodoList component to display the list of todos
'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '@/services/types';
import { getTodos, deleteTodo } from '@/services/todos';
import TodoItem from '../TodoItem/TodoItem';
import { Button } from '../ui/button';

interface TodoListProps {
  onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onEdit }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        const success = await deleteTodo(id);
        if (success) {
          setTodos(todos.filter(todo => todo.id !== id));
        }
      } catch (err) {
        console.error('Failed to delete todo:', err);
        setError('Failed to delete todo. Please try again.');
      }
    }
  };

  const handleUpdate = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  if (loading) {
    return <div className="text-center py-8">Loading todos...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No todos found. Add a new todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Todos</h2>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onEdit={onEdit}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;