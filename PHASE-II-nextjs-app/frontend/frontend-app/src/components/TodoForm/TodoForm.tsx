'use client';
import React, { useState, useEffect } from 'react';
import { Todo } from '@/services/types';
import { createTodo, updateTodo } from '@/services/todos';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';

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
    } else if (title.length > 255) {
      newErrors.title = 'Title must be under 255 characters';
    }

    if (description && description.length > 1000) {
      newErrors.description = 'Description must be under 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const savedTodo = todo
        ? await updateTodo(todo.id, { title, description: description || undefined })
        : await createTodo({ title, description: description || undefined });

      onSubmit(savedTodo);
      toast.success(todo ? 'Todo updated successfully!' : 'Todo added successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save todo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          {todo ? 'Edit Todo' : 'Create New Todo'}
        </h2>
        <p className="text-sm text-gray-800">
          {todo ? 'Update your task details' : 'Add a new task to stay organized'}
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Finish project report"
          disabled={isLoading}
          className={`w-full rounded-xl px-4 py-3 text-gray-600 text-sm border transition focus:outline-none focus:ring-2 ${
            errors.title
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:ring-blue-200'
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Description
        </label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details about this task"
          disabled={isLoading}
          className={`w-full rounded-xl px-4 py-3 text-gray-600 text-sm border transition focus:outline-none focus:ring-2 ${
            errors.description
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:ring-blue-200'
          }`}
        />
        <div className="flex justify-between text-xs text-gray-800 mt-1">
          <span>{errors.description}</span>
          <span>{description.length}/1000</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
         <Button type="submit" disabled={isLoading}>
          {isLoading
            ? todo
              ? 'Updating...'
              : 'Adding...'
            : todo
            ? 'Update Todo'
            : 'Add Todo'}
        </Button>
        <Button className='bg-gray-500 text-black hover:bg-gra'
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
