// Todo detail/edit page for individual todos
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Todo } from '@/services/types';
import { getTodoById } from '@/services/todos';
import TodoForm from '@/components/TodoForm/TodoForm';

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
        const fetchedTodo = await getTodoById(id as string);
        setTodo(fetchedTodo);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch todo:', err);
        setError('Failed to load todo. Please try again later.');
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
  };

  const handleCancel = () => {
    router.back(); // Go back to the previous page
  };

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading todo...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-center text-red-500">{error}</div>;
  }

  if (!todo) {
    return <div className="container mx-auto py-8 text-center">Todo not found.</div>;
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Todo</h1>
      <TodoForm
        todo={todo}
        onSubmit={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TodoDetailPage;