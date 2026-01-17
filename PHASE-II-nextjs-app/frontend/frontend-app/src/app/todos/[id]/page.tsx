'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Todo } from '@/services/types';
import { getTodoById } from '@/services/todos';
import TodoForm from '@/components/TodoForm/TodoForm';
import toast from 'react-hot-toast';

const TodoDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const fetchedTodo = await getTodoById(Number(id));
        setTodo(fetchedTodo);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch todo:', err);
        setError('Failed to load todo. Please try again later.');
        toast.error('Failed to load todo details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id]);

  const handleSave = (updatedTodo: Todo) => {
    setTodo(updatedTodo);
    router.push('/todos'); // Redirect back to the todos list
    toast.success('Todo updated successfully!');
  };

  const handleCancel = () => {
    router.back(); // Go back to the previous page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-150px)] py-8">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
        <p className="ml-4 text-xl text-gray-600 dark:text-gray-300">Loading todo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center px-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg shadow-md max-w-md">
        <p className="font-semibold text-lg mb-2">Error loading todo!</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="container mx-auto py-8 text-center text-gray-700 dark:text-gray-300">
        <p className="text-xl font-medium">Todo not found.</p>
        <button onClick={() => router.push('/todos')} className="mt-4 text-primary hover:underline">
          Go to Todos List
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl px-4 fade-in">
      <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 animate-slide-in">Edit Task</h1>
      <TodoForm
        todo={todo}
        onSubmit={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TodoDetailPage;