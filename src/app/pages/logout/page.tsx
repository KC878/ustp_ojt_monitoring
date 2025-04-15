import Logout from '@src/components/Logout';
import ProtectedRoute from '@src/middleware/ProtectedRoute';
import { useAuth } from '@src/store/useAuth';
import { useEffect } from 'react';
import { socket } from '@src/utils/socketClient';
import { useLoading } from '@src/store/useLoading';
const LogoutPage = () => {
  const { logout, setLogout } = useAuth();
  const { setRefreshWindow } = useLoading();
  

  useEffect(() => {
    if (logout) {
      socket.emit('logout');

      socket.on('user-logout', (message: string) => {
        console.log(message);
        alert(message);
      })

      setLogout(false); // set it to false after emitting
      setRefreshWindow(true);
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
