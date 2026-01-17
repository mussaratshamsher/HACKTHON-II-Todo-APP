'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import TodoList from '@/components/TodoList/TodoList';
import TodoForm from '@/components/TodoForm/TodoForm';
import { Todo } from '@/services/types';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Import the Button component
import toast from 'react-hot-toast';
import { PlusCircle } from 'lucide-react'; // Import PlusCircle icon

const TodosPageContent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Function to fetch todos with retry mechanism
  const fetchTodos = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    for (let i = 0; i < maxRetries; i++) {
      try {
        const { getTodos } = await import('@/services/todos');
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
        setLoading(false);
        return; // Success, exit function
      } catch (err) {
        console.error(`Failed to fetch todos (attempt ${i + 1}/${maxRetries}):`, err);
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    // If all retries fail
    setError('Failed to load todos after multiple attempts. Please check your connection and try again.');
    toast.error('Failed to load todos.');
    setLoading(false);
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    if (!searchQuery) {
      return todos;
    }
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [todos, searchQuery]);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingTodo(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (todo: Todo) => {
    setEditingTodo(null);
    setShowForm(false);
    await fetchTodos(); // Re-fetch todos after successful submission
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        const { deleteTodo } = await import('@/services/todos');
        const success = await deleteTodo(id);
        if (success) {
          setTodos(todos.filter(todo => todo.id !== id));
          toast.success('Todo deleted successfully!');
        } else {
          toast.error('Failed to delete todo.');
        }
      } catch (err) {
        console.error('Failed to delete todo:', err);
        setError('Failed to delete todo. Please try again.');
        toast.error('Failed to delete todo.');
      }
    }
  };

  const handleUpdate = (updatedTodo: Todo) => {
    setTodos(todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setShowForm(false);
  };

  // Listen for the custom event to add a new todo
  useEffect(() => {
    const handleAddNewTodo = () => {
      handleAddNew();
    };

    window.addEventListener('addNewTodo', handleAddNewTodo);

    return () => {
      window.removeEventListener('addNewTodo', handleAddNewTodo);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100
     dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-8">
      <div className="container mx-auto px-4 md:py-12 max-w-4xl">

        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-10 fade-in">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 animate-slide-in">
              My Tasks
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay organized and productive
            </p>
          </div>

          <Button
            onClick={handleAddNew}
            className="group outline-2 outline-gray-300 hover:outline-gray-100 text-gray-300 duration-500 hover:transform-border"
          >
            <PlusCircle className="mr-2 h-5 w-5 group-hover:rotate-90 text-green-600 transition-transform duration-200" /> Add New Task
          </Button>
        </header>

        {/* Form Card */}
        {showForm && (
          <section className="mb-8">
            <TodoForm
              todo={editingTodo}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </section>
        )}

        {/* Todo List Card */}
        <section className="fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
            {searchQuery && filteredTodos.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 fade-in">
                No todos found for &quot;{searchQuery}&quot;.
              </div>
            )}
            <TodoList
              todos={filteredTodos}
              loading={loading}
              error={error}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onAddNew={handleAddNew}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

import withAuth from "@/components/withAuth";

const TodosPage = () => (
  <Suspense fallback={<div>Loading Todos...</div>}>
    <TodosPageContent />
  </Suspense>
);

export default withAuth(TodosPage);