'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTodoById, updateTodo } from '@/services/todos';
import { Todo } from '@/services/types';
import { formatDate } from '@/lib/utils';
import TodoForm from '@/components/TodoForm/TodoForm';

export default function TodoDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    try {
      setLoading(true);
      const response = await getTodoById(id as string);
      setTodo(response.data);
    } catch (err) {
      setError('Failed to load todo. Please try again later.');
      console.error('Error fetching todo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedData: Partial<Todo>) => {
    if (!todo) return;

    try {
      const response = await updateTodo(todo.id, updatedData);
      setTodo(response.data);
      // Optionally navigate back to the todos list
      // router.push('/todos');
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading todo...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => fetchTodo()}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!todo) {
    return <div className="text-center py-8">Todo not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Current Todo</h2>
            <div className={`border rounded-lg p-4 ${todo.completed ? 'bg-green-50' : 'bg-white'}`}>
              <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`mt-1 text-gray-600 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.description}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Created: {formatDate(todo.createdAt)} | Updated: {formatDate(todo.updatedAt)}
              </p>
              <p className="mt-2 text-sm font-medium">
                Status: <span className={todo.completed ? 'text-green-600' : 'text-yellow-600'}>
                  {todo.completed ? 'Completed' : 'Active'}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Todo</h2>
            <TodoForm
              initialTodo={todo}
              onUpdateTodo={handleUpdate}
              onCancel={() => router.back()}
            />
          </div>
        </div>
      </main>
    </div>
  );
}