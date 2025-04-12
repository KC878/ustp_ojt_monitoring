import Logout from '@src/components/Logout';

import ProtectedRoute from '@src/middleware/ProtectedRoute';


const LogoutPage = () => {

  return (
    <>
      <ProtectedRoute> 
        <Logout />
      </ProtectedRoute>
    </>
  );
}

export default LogoutPage;