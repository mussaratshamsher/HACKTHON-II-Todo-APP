// TodoForm component for adding and editing todos
'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '@/services/types';
import { createTodo, updateTodo } from '@/services/todos';
import { Button } from '../ui/button';

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (todo: Todo) => void;
  onCancel: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
    }
  }, [todo]);

  const validate = () => {
    const newErrors: { title?: string; description?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 1 || title.length > 255) {
      newErrors.title = 'Title must be between 1 and 255 characters';
    }
    
    if (description && description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      let updatedTodo: Todo;
      
      if (todo) {
        // Editing existing todo
        updatedTodo = await updateTodo(todo.id, {
          title,
          description: description || undefined,
        });
      } else {
        // Creating new todo
        updatedTodo = await createTodo({
          title,
          description: description || undefined,
          completed: false,
        });
      }
      
      onSubmit(updatedTodo);
    } catch (err) {
      console.error('Failed to save todo:', err);
      setErrors({ title: 'Failed to save todo. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-medium mb-4">
        {todo ? 'Edit Todo' : 'Add New Todo'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={isLoading}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="mt-1 text-sm text-red-600">
            {errors.title}
          </p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={isLoading}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        {errors.description && (
          <p id="description-error" className="mt-1 text-sm text-red-600">
            {errors.description}
          </p>
        )}
      </div>
      
      <div className="flex space-x-3">
        <Button 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? (todo ? 'Updating...' : 'Adding...') : (todo ? 'Update Todo' : 'Add Todo')}
        </Button>
        
        <Button 
          type="button" 
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;