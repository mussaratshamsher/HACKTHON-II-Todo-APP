# Data Model: Frontend Todo Application

## Todo Entity

**Fields**:
- `id`: string (unique identifier from backend)
- `title`: string (required, max 255 characters)
- `description`: string (optional, max 1000 characters)
- `completed`: boolean (default: false)
- `createdAt`: Date (timestamp from backend)
- `updatedAt`: Date (timestamp from backend)

**Validation Rules**:
- `title` must be between 1 and 255 characters
- `description` can be empty or up to 1000 characters
- `completed` must be a boolean value
- `createdAt` and `updatedAt` are read-only (managed by backend)

**State Transitions**:
- `active` → `completed` (when user marks todo as complete)
- `completed` → `active` (when user marks todo as incomplete)

## TodoList Collection

**Fields**:
- `todos`: Array<Todo> (list of todo items)
- `filter`: string (optional, values: "all", "active", "completed")

**Operations**:
- Add new todo to list
- Remove todo from list
- Update todo in list
- Filter todos by completion status
- Sort todos by creation date or title

## API Response Structures

### Get Todos Response
```typescript
{
  data: Todo[],
  meta: {
    totalCount: number,
    currentPage: number,
    totalPages: number
  }
}
```

### Get Single Todo Response
```typescript
{
  data: Todo
}
```

### Create Todo Request/Response
```typescript
// Request
{
  title: string,
  description?: string
}

// Response
{
  data: Todo
}
```

### Update Todo Request/Response
```typescript
// Request
{
  title?: string,
  description?: string,
  completed?: boolean
}

// Response
{
  data: Todo
}
```

### Delete Todo Response
```typescript
{
  success: boolean
}
```