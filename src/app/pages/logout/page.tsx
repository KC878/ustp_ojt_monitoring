import Logout from '@src/components/Logout';

import ProtectedRoute from '@src/middleware/ProtectedRoute';

import { useAuth } from '@src/store/useAuth';



const LogoutPage = () => {
  const { logout } = useAuth();

  return (
    <>
      <ProtectedRoute> 
        <Logout />
      </ProtectedRoute>
    </>
  );
}

export default LogoutPage;