import Logout from '@src/components/Logout';
import ProtectedRoute from '@src/middleware/ProtectedRoute';
import { useAuth } from '@src/store/useAuth';
import { useEffect } from 'react';
import { socket } from '@src/utils/socketClient';
import { useMiddleware } from '@src/services/useMiddleware';

const LogoutPage = () => {
  const { logout, setLogout } = useAuth();
  const { isAuthenticated } = useMiddleware();

  useEffect(() => {
    if (logout) {
      socket.emit('logout');

      socket.on('user-logout', (message: string) => {
        console.log(message);
      })

      setLogout(false); // set it to false after emitting
    }
    return () => {
         // Cleanup if necessary
      // socket.off('user-logout');
    };
  }, [logout]);

  return (
    <>
      <ProtectedRoute>
        <Logout />
      </ProtectedRoute>
    </>
  );
};

export default LogoutPage;
