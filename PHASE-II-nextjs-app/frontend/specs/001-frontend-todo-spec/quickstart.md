# Quickstart Guide: Frontend Todo Application

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Backend API running locally (assumed to be at `http://localhost:8080`)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create environment configuration:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser to [http://localhost:3000](http://localhost:3000)

## Key Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run linter
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## Project Structure Overview

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── services/            # API service layer
│   ├── lib/                 # Utility functions
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
├── __tests__/               # Test files
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Styling configuration
└── package.json             # Dependencies and scripts
```

## Making API Requests

The application uses a service layer to communicate with the backend API:

```typescript
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/services/todos';

// Get all todos
const todos = await getTodos();

// Create a new todo
const newTodo = await createTodo({ title: 'New task', description: 'Task description' });

// Update a todo
const updatedTodo = await updateTodo('todo-id', { completed: true });

// Delete a todo
await deleteTodo('todo-id');
```

## Running Tests

Unit tests:
```bash
npm run test
```

End-to-end tests:
```bash
npm run test:e2e
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - Base URL for the backend API (required)