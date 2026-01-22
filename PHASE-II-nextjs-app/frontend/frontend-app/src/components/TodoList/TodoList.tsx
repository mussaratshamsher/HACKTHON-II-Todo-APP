'use client';

import React from 'react';
import { Todo } from '@/services/types';
import TodoItem from '../TodoItem/TodoItem';
import { Button } from '../ui/button';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (updatedTodo: Todo) => void;
  onAddNew?: () => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  error,
  onEdit,
  onDelete,
  onUpdate,
  onAddNew,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        <p className="ml-4 text-lg text-gray-600 dark:text-gray-300">Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 px-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg shadow-md max-w-md mx-auto">
        <p className="font-semibold text-lg mb-2">Error loading todos!</p>
        <p>{error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 px-4 fade-in">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-5xl mb-4 animate-bounce">📝</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">No tasks, no problem!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Looks like your to-do list is empty. Time to add some new goals!
          </p>
          <Button
            onClick={onAddNew}
            className="w-full sm:w-auto"
          >
            Add Your First Todo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-bold text-blue-500 dark:text-gray-100">Your Todos</h2>
        <span className="bg-primary/10 text-primary px-3 py-1 text-gray-300 rounded-full text-sm font-semibold">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      {todos.map((todo, index) => (
        <div key={todo.id} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <TodoItem
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
