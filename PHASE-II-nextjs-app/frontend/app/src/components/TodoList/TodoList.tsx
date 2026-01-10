"use client";

import { useState, useEffect } from "react";
import { getTodos } from "@/services/todos";
import { Todo } from "@/services/types";
import TodoItem from "../TodoItem/TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await getTodos();
      setTodos(response.data);
    } catch (err) {
      setError("Failed to load todos. Please try again later.");
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
        <button
          onClick={fetchTodos}
          className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-border/40">
        <h2 className="text-2xl font-bold text-primary">
          My Tasks ({todos.length})
        </h2>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <p className="text-foreground/70 text-lg">
            You have no tasks. Enjoy your day!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}