// Component tests for UI components
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from '@/components/TodoForm/TodoForm';
import { Todo } from '@/services/types';

describe('TodoForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly in add mode', () => {
    render(
      <TodoForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    expect(screen.getByText(/add new todo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('renders correctly in edit mode', () => {
    const todo: Todo = {
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    };

    render(
      <TodoForm 
        todo={todo}
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    expect(screen.getByText(/edit todo/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update todo/i })).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when form is submitted', async () => {
    render(
      <TodoForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    const titleInput = screen.getByLabelText(/title \*/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <TodoForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('shows validation error for empty title', async () => {
    render(
      <TodoForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    const titleInput = screen.getByLabelText(/title \*/i);
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });
});