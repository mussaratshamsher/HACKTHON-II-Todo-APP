// TodoItem component to display individual todo items
'use client';

import React from 'react';
import { Todo } from '@/services/types';
import { toggleTodo } from '@/services/todos';
import { Button } from '../ui/button';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedTodo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, onUpdate }) => {
  const handleToggle = async () => {
    try {
      const updatedTodo = await toggleTodo(todo.id);
      onUpdate(updatedTodo);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 mb-2 rounded-lg border ${todo.completed ? 'bg-gray-100 opacity-70' : 'bg-white'}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="h-5 w-5 mr-3 cursor-pointer"
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        />
        <div>
          <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-700' : 'text-gray-800'}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm mt-1 ${todo.completed ? 'line-through text-gray-700' : 'text-gray-800'}`}>
              {todo.description}
            </p>
          )}
          <p className="text-xs text-gray-700 mt-1">
            Created: {new Date(todo.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button 
          onClick={() => onEdit(todo)} 
          variant="outline" 
          size="sm"
          aria-label="Edit todo"
        >
          Edit
        </Button>
        <Button 
          onClick={() => onDelete(todo.id)} 
          variant="destructive" 
          size="sm"
          aria-label="Delete todo"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;