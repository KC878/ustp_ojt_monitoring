import Logout from '@src/components/Logout';
import ProtectedRoute from '@src/middleware/ProtectedRoute';
import { useAuth } from '@src/store/useAuth';
import { useEffect } from 'react';
import { socket } from '@src/utils/socketClient';
import { useLoading } from '@src/store/useLoading';
const LogoutPage = () => {
  const { logout, setLogout } = useAuth();
  const { setRefreshWindow } = useLoading();
  
  const email = localStorage.getItem('email')
  useEffect(() => {

    if (logout) {
      socket.emit('logout', email); // refers to the curren email of user

      
      setRefreshWindow(true);
    }
    return () => {
         // Cleanup if necessary
      // socket.off('user-logout');
    };
  }, [logout]);
  

  const handleLogout = (message: string) => {
    alert(message);
  }
  return (
    <>
      <ProtectedRoute>
        <Logout />
      </ProtectedRoute>
    </>
  );
};

export default LogoutPage;
