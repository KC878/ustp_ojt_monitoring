

export const useMiddleware = () => {
  const token = localStorage.getItem('token');

  const isAuthenticated = !!token;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // optionally: redirect to login
  };

  return { isAuthenticated, token, logout };
};
