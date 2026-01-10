import { Suspense } from "react";
import TodoList from "@/components/TodoList/TodoList";
import TodoForm from "@/components/TodoForm/TodoForm";

export default function TodosPage() {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          My Todo List
        </h1>
        <p className="text-foreground/80">
          Manage your tasks efficiently and stay organized
        </p>
      </div>

      <div className="bg-secondary/50 rounded-lg shadow-lg p-6 md:p-8 border border-border/40">
        <div className="mb-8">
          <TodoForm />
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          }
        >
          <TodoList />
        </Suspense>
      </div>
    </div>
  );
}