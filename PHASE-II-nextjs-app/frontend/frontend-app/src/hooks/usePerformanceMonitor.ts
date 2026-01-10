// Custom hook for performance optimization
import { useState, useEffect } from 'react';

export const usePerformanceMonitor = () => {
  const [renderTime, setRenderTime] = useState<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    
    // Simulate performance measurement
    const timer = setTimeout(() => {
      const end = performance.now();
      setRenderTime(end - start);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return { renderTime };
};