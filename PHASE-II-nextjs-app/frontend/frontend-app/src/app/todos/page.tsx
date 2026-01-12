'use client';

import React, { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList/TodoList';
import TodoForm from '@/components/TodoForm/TodoForm';
import { Todo } from '@/services/types';

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Function to fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { getTodos } = await import('@/services/todos');
      const fetchedTodos = await getTodos();
      console.log('TodosPage: Fetched Todos:', fetchedTodos); // Debug log
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

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
        }
      } catch (err) {
        console.error('Failed to delete todo:', err);
        setError('Failed to delete todo. Please try again.');
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              My Todos
            </h1>
            <p className="text-gray-600">
              Stay organized and productive
            </p>
          </div>

          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-medium shadow-md hover:bg-blue-700 hover:scale-105 transition"
          >
            ➕ Add Todo
          </button>
        </header>

        {/* Form Card */}
        {showForm && (
          <section className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-600 mb-4">
                {editingTodo ? 'Edit Todo' : 'Create New Todo'}
              </h2>

              <TodoForm
                todo={editingTodo}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            </div>
          </section>
        )}

        {/* Todo List Card */}
        <section>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Tasks
            </h2>

            <TodoList
              todos={todos}
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

export default TodosPage;
