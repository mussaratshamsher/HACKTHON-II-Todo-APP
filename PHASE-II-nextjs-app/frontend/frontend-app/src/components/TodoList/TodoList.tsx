// TodoList component to display the list of todos
'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '@/services/types';
import { getTodos, deleteTodo } from '@/services/todos';
import TodoItem from '../TodoItem/TodoItem';
import { Button } from '../ui/button';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (updatedTodo: Todo) => void;
  onAddNew?: () => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  error,
  onEdit,
  onDelete,
  onUpdate,
  onAddNew,
}) => {
  console.log('TodoList: Todos prop:', todos); // Debug log


  const handleLocalDelete = async (id: string) => {
    // Call the onDelete prop directly, which is handled by TodosPage
    await onDelete(id);
  };

  const handleLocalUpdate = (updatedTodo: Todo) => {
    // Call the onUpdate prop directly, which is handled by TodosPage
    onUpdate(updatedTodo);
  };

  if (loading) {
    return <div className="text-center py-8">Loading todos...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No todos yet</h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first todo task
          </p>
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Add Your First Todo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Todos ({todos.length})</h2>
      </div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={handleLocalDelete}
          onUpdate={handleLocalUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;