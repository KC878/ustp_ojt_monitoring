

export const useMiddleware = () => {
  const token = localStorage.getItem('token');

  const isAuthenticated = !!token; // token checker --> organize this later 

  return { isAuthenticated, token};
};
