# Todo Application - Frontend

A modern, responsive todo application built with Next.js, TypeScript, and Tailwind CSS. This frontend connects to a backend API to manage todo items with full CRUD functionality.

## Features

- **Create, Read, Update, Delete (CRUD)**: Full todo management capabilities
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Real-time Updates**: Optimistic UI updates with backend synchronization
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation support
- **Error Handling**: Graceful error handling with user-friendly messages
- **Debounced Actions**: Prevents rapid API calls for better performance
- **Environment Configuration**: Configurable API endpoint via environment variables

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS
- **Runtime**: React 19.2.3
- **Package Manager**: npm

## Prerequisites

- Node.js 18.x or higher
- npm package manager
- Backend API running (assumed to be at `http://localhost:8080`)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root of the project:

```bash
cp .env.example .env.local
```

Then update the environment variable:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run linter

## Project Structure

```
frontend-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with Navbar and Footer
│   │   ├── page.tsx         # Home page
│   │   └── todos/           # Todo-related routes
│   │       ├── page.tsx     # Todo list page
│   │       └── [id]/        # Individual todo routes
│   │           └── page.tsx # Todo detail/edit page
│   ├── components/          # Reusable UI components
│   │   ├── Navbar/          # Navigation component
│   │   ├── Footer/          # Footer component
│   │   ├── TodoForm/        # Add/edit todo form
│   │   ├── TodoItem/        # Individual todo display
│   │   ├── TodoList/        # Todo list container
│   │   └── ui/              # Base UI components
│   ├── services/            # API service layer
│   │   ├── api-client.ts    # Base API client with environment config
│   │   ├── todos.ts         # Todo-specific API functions
│   │   └── types.ts         # Shared TypeScript types
│   ├── lib/                 # Utility functions
│   │   └── utils.ts         # Helper functions
│   └── hooks/               # Custom React hooks
│       └── useTodos.ts      # Todo state management
├── public/                  # Static assets
├── .env.example             # Example environment variables
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## API Integration

The application communicates with the backend API through a dedicated service layer:

```typescript
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo } from '@/services/todos';

// Get all todos
const todos = await getTodos();

// Create a new todo
const newTodo = await createTodo({ title: 'New task', description: 'Task description' });

// Update a todo
const updatedTodo = await updateTodo('todo-id', { completed: true });

// Delete a todo
await deleteTodo('todo-id');

// Toggle completion status
const toggledTodo = await toggleTodo('todo-id');
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - Base URL for the backend API (required)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.