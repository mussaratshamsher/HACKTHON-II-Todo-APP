// Component tests for TodoItem
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoItem from '@/components/TodoItem/TodoItem';
import { Todo } from '@/services/types';

// Mock the services
jest.mock('@/services/todos', () => ({
  toggleTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

import { toggleTodo, deleteTodo } from '@/services/todos';

// Define sample todo data
const mockTodo: Todo = {
  id: '1',
  title: 'Test Todo',
  description: 'Test Description',
  completed: false,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

describe('TodoItem Component', () => {
  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo item correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders completed todo with strikethrough', () => {
    const completedTodo = { ...mockTodo, completed: true };
    
    render(
      <TodoItem
        todo={completedTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const titleElement = screen.getByText('Test Todo');
    expect(titleElement).toHaveClass('line-through');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls toggle function when checkbox is clicked', async () => {
    const mockUpdatedTodo = { ...mockTodo, completed: true };
    (toggleTodo as jest.MockedFunction<any>).mockResolvedValue({ data: mockUpdatedTodo });

    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(toggleTodo).toHaveBeenCalledWith(mockTodo.id);
      expect(mockOnUpdate).toHaveBeenCalledWith(mockUpdatedTodo);
    });
  });

  it('calls delete function when delete button is clicked', async () => {
    (deleteTodo as jest.MockedFunction<any>).mockResolvedValue({ success: true });

    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByLabelText(`Delete todo "${mockTodo.title}"`);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteTodo).toHaveBeenCalledWith(mockTodo.id);
      expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id);
    });
  });

  it('handles keyboard events for accessibility', async () => {
    const mockUpdatedTodo = { ...mockTodo, completed: true };
    (toggleTodo as jest.MockedFunction<any>).mockResolvedValue({ data: mockUpdatedTodo });

    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' });

    await waitFor(() => {
      expect(toggleTodo).toHaveBeenCalledWith(mockTodo.id);
      expect(mockOnUpdate).toHaveBeenCalledWith(mockUpdatedTodo);
    });
  });
});