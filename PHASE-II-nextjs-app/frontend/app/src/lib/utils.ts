// Utility functions for the Todo application

// Function to format date strings consistently
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Function to truncate text to a specified length
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

// Function to validate todo title length
export const isValidTitle = (title: string): boolean => {
  return title.length >= 1 && title.length <= 255;
};

// Function to validate todo description length
export const isValidDescription = (description?: string): boolean => {
  if (!description) return true; // Description is optional
  return description.length <= 1000;
};

// Function to generate a unique ID (in case needed for optimistic updates)
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Debounce function to limit the rate at which a function can fire
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  }) as T;
};