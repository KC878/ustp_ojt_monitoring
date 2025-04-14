import Logout from '@src/components/Logout';

import ProtectedRoute from '@src/middleware/ProtectedRoute';

import { useAuth } from '@src/store/useAuth';
import { useSocketIO } from '@src/services/useSocketIO';


const LogoutPage = () => {
  const { logout } = useAuth();
  const { socket } = useSocketIO();

  
  if(logout){ 
    socket.emit('user-logout', 'From Logout Page - user has logged out.');
  }
  return (
    <>
      <ProtectedRoute> 
        <Logout />
      </ProtectedRoute>
    </>
  );
}

export default LogoutPage;