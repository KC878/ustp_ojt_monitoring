import { useState, useEffect } from 'react';

export const useMiddleware = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if window is defined (to ensure we are in the browser)
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
      setIsAuthenticated(!!storedToken);
    }
  }, []);

  return { isAuthenticated, token };
};
