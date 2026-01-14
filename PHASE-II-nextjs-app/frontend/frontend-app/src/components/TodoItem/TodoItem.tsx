'use client';

import React from 'react';
import { Todo } from '@/services/types';
import { toggleTodo } from '@/services/todos';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedTodo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, onUpdate }) => {
  const handleToggle = async () => {
    try {
      const updatedTodo = await toggleTodo(todo.id, !todo.completed);
      onUpdate(updatedTodo);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border transition-all duration-200 ease-in-out shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
        todo.completed ? 'bg-gray-100/70 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900',
        'fade-in'
      )}
    >
      <div className="flex items-start flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="h-5 w-5 mr-4 cursor-pointer mt-1 accent-primary"
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        />
        <div className="flex-1">
          <h3
            className={cn(
              'font-medium text-lg',
              todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'
            )}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={cn(
                'text-sm mt-1',
                todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'
              )}
            >
              {todo.description}
            </p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Created: {new Date(todo.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-4 sm:mt-0 sm:gap-3">
        <Button
          onClick={() => onEdit(todo)}
          variant="outline"
          size="sm"
          aria-label="Edit todo"
          className="w-full sm:w-auto focus- bg-gray-50 focus-ring-2"
        >
          Edit
        </Button>
        <Button
          onClick={() => onDelete(todo.id)}
          variant="destructive"
          size="sm"
          aria-label="Delete todo"
          className="w-full sm:w-auto"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;