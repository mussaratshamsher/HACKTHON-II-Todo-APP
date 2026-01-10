import { Todo } from "@/services/types";
import { formatDate, debounce } from "@/lib/utils";
import { toggleTodo, deleteTodo } from "@/services/todos";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const debouncedToggle = useCallback(
    debounce(async () => {
      try {
        setIsToggling(true);
        const response = await toggleTodo(todo.id);
        onUpdate(response.data);
      } catch (error) {
        console.error("Failed to toggle todo:", error);
      } finally {
        setIsToggling(false);
      }
    }, 300),
    [todo.id, onUpdate]
  );

  const handleToggle = () => {
    if (isToggling) return;
    debouncedToggle();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTodo(todo.id);
      onDelete(todo.id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
      setIsDeleting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className={`rounded-lg p-5 mb-4 shadow-md border transition-all duration-300 card-hover ${
        todo.completed
          ? "bg-secondary/30 border-green-500/30"
          : "bg-secondary/60 hover:shadow-lg"
      }`}
    >
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          onKeyDown={handleKeyDown}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
          aria-label={`Mark "${todo.title}" as ${
            todo.completed ? "incomplete" : "complete"
          }`}
          role="switch"
          aria-checked={todo.completed}
        />
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center">
            <h3
              className={`text-lg font-semibold ${
                todo.completed
                  ? "line-through text-foreground/50"
                  : "text-foreground"
              }`}
            >
              {todo.title}
            </h3>
            {todo.completed && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            )}
          </div>

          {todo.description && (
            <p
              className={`mt-2 text-foreground/70 ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center text-xs text-foreground/50">
            <span className="mr-3">
              Created: {formatDate(todo.createdAt)}
            </span>
            <span>Updated: {formatDate(todo.updatedAt)}</span>
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <Link href={`/todos/${todo.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}