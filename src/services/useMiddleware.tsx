export const useMiddleware = () => {
  let token = null;

  if (typeof window !== 'undefined') {
    // Access localStorage only on the client side
    token = localStorage.getItem('token');
  }

  const isAuthenticated = !!token; // token checker

  return { isAuthenticated, token };
};
