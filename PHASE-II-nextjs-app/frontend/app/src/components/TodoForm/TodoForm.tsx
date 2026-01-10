"use client";

import { useState, useEffect } from "react";
import { createTodo, updateTodo } from "@/services/todos";
import { CreateTodoRequest, UpdateTodoRequest, Todo } from "@/services/types";
import { isValidTitle, isValidDescription } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TodoFormProps {
  onAddTodo?: (todo: Todo) => void;
  onUpdateTodo?: (updatedData: Partial<Todo>) => void;
  initialTodo?: Todo;
  onCancel?: () => void;
}

export default function TodoForm({
  onAddTodo,
  onUpdateTodo,
  initialTodo,
  onCancel,
}: TodoFormProps) {
  const [title, setTitle] = useState(initialTodo?.title || "");
  const [description, setDescription] = useState(
    initialTodo?.description || ""
  );
  const [completed, setCompleted] = useState(initialTodo?.completed || false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title);
      setDescription(initialTodo.description || "");
      setCompleted(initialTodo.completed);
    }
  }, [initialTodo]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!isValidTitle(title)) {
      newErrors.title = "Title must be between 1 and 255 characters";
    }

    if (!isValidDescription(description)) {
      newErrors.description = "Description must be 1000 characters or less";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (initialTodo && onUpdateTodo) {
        const updateData: UpdateTodoRequest = {
          title,
          description: description || undefined,
          completed,
        };
        onUpdateTodo(updateData);
      } else if (onAddTodo) {
        const todoData: CreateTodoRequest = {
          title,
          description: description || undefined,
        };
        const response = await createTodo(todoData);
        onAddTodo(response.data);
        if (!initialTodo) {
          setTitle("");
          setDescription("");
        }
      }
      setErrors({});
    } catch (error) {
      console.error(
        initialTodo ? "Failed to update todo:" : "Failed to create todo:",
        error
      );
      setErrors({
        form: initialTodo
          ? "Failed to update todo. Please try again."
          : "Failed to create todo. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = !!initialTodo;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-foreground/80 mb-2"
        >
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-2 border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
            errors.title ? "border-destructive" : "border-border"
          }`}
          placeholder="What needs to be done?"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="mt-1 text-sm text-destructive">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-foreground/80 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`w-full px-4 py-2 border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
            errors.description ? "border-destructive" : "border-border"
          }`}
          placeholder="Add details (optional)"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        {errors.description && (
          <p id="description-error" className="mt-1 text-sm text-destructive">
            {errors.description}
          </p>
        )}
      </div>

      {isEditing && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-5 w-5 text-primary rounded border-border focus:ring-ring"
          />
          <label
            htmlFor="completed"
            className="ml-2 text-sm text-foreground/80"
          >
            Mark as completed
          </label>
        </div>
      )}

      {errors.form && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md">
          {errors.form}
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
            ? "Update Todo"
            : "Add Todo"}
        </Button>

        {isEditing && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}