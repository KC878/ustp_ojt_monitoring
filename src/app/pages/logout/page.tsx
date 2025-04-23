'use client'

import Logout from '@src/components/Logout';
import ProtectedRoute from '@src/middleware/ProtectedRoute';
import { useAuth } from '@src/store/useAuth';
import { useEffect } from 'react';
import { socket } from '@src/utils/socketClient';
import { useLoading } from '@src/store/useLoading';
import { postData } from '@src/services/usePostData';
const LogoutPage = () => {
  const { logout } = useAuth();
  const { setRefreshWindow } = useLoading();
  
  const email = localStorage.getItem('email');

  const dbLogout = async () => {
    await postData(
      '/api/auth/logout',
      ['email'],
      [email],
    )
  }; // no more message

  useEffect(() => {

    if (logout) {
      socket.emit('logout', email); // refers to the curren email of use
      
      dbLogout(); // CALL THE LOGOUT
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
