'use client';
import React, { useState, useEffect } from 'react';
import { Todo } from '@/services/types';
import { createTodo, updateTodo } from '@/services/todos';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils'; // Import cn utility
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface TodoFormProps {
  todo: Todo | null;
  onSubmit: (todo: Todo) => void;
  onCancel: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

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
    if (!user) {
      toast.error('You must be logged in to create or update a todo.');
      router.push('/login');
      return;
    }
    if (!validate()) return;

    setIsLoading(true);
    try {
      const savedTodo = todo
        ? await updateTodo(todo.id, { title, description: description || undefined, completed: todo.completed })
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
      className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-6 fade-in"
    >
      {/* Header */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
          {todo ? 'Edit Todo' : 'Create New Todo'}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {todo ? 'Update your task details' : 'Add a new task to stay organized'}
        </p>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Finish project report"
          disabled={isLoading}
          className={cn(
            `w-full rounded-xl px-4 py-3 text-gray-800 dark:text-gray-200 text-sm border transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 bg-gray-50 dark:bg-gray-700`,
            errors.title
              ? 'border-red-500 focus:ring-red-300'
              : 'border-gray-300 dark:border-gray-600 focus:ring-primary/50'
          )}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 fade-in">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details about this task"
          disabled={isLoading}
          className={cn(
            `w-full rounded-xl px-4 py-3 text-gray-800 dark:text-gray-200 text-sm border transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 bg-gray-50 dark:bg-gray-700`,
            errors.description
              ? 'border-red-500 focus:ring-red-300'
              : 'border-gray-300 dark:border-gray-600 focus:ring-primary/50'
          )}
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          {errors.description && (
            <span className="text-red-600 dark:text-red-400 fade-in">{errors.description}</span>
          )}
          <span>{description.length}/1000</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
         <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600">
          {isLoading
            ? todo
              ? 'Updating...'
              : 'Adding...'
            : todo
            ? 'Update Todo'
            : 'Add Todo'}
        </Button>
        <Button
          type="button"
          variant="destructive" // Use the destructive variant for cancel
          onClick={onCancel}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>      
      </div>
    </form>
  );
};
export default TodoForm;