// Todos page to display the list of todos and form
'use client';

import React, { useState } from 'react';
import TodoList from '@/components/TodoList/TodoList';
import TodoForm from '@/components/TodoForm/TodoForm';
import { Todo } from '@/services/types';

const TodosPage = () => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingTodo(null);
    setShowForm(true);
  };

  const handleFormSubmit = (todo: Todo) => {
    setEditingTodo(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Todo App</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-gray-600 px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add New Todo
        </button>
      </div>

      {showForm && (
        <TodoForm
          todo={editingTodo}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      <TodoList onEdit={handleEdit} />
    </div>
  );
};

export default TodosPage;