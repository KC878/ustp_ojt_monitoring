import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMiddleware } from "@src/services/useMiddleware";
import { useAuthMiddleware } from '@src/store/useAuth';

import useRouteLoading from '@src/hooks/useRouteLoading';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const { isAuthenticated } = useMiddleware();
  const { setAuthAction } = useAuthMiddleware();

  useRouteLoading(); // call the useRouteLoading custom hook to listen if the route is being changed

  console.log("Outside: ");
  console.log(pathName);
  console.log(isAuthenticated);

  ////////////// page authentication
  useEffect(() => {
    console.log(pathName);

    // If not authenticated and trying to access a page other than /auth, redirect to /auth
    if (!isAuthenticated && pathName !== '/pages/auth') {
      console.log(`/pages/auth: ---> ${pathName}`);
      setAuthAction('login'); // make sure the rendered component is login
      router.push('/pages/auth'); // push to the auth page
    }
    
    // If authenticated and trying to access /auth, redirect to /dashboard
    if (isAuthenticated && pathName === '/pages/auth') {
      console.log(`route: '/pages/auth' === ${pathName}`);

      window.location.replace('/pages/dashboard')
    }
  }, [isAuthenticated, pathName, router]);

  if (!isAuthenticated && pathName !== '/pages/auth') return null; // for authentication

  return <>{children}</>;
};

export default ProtectedRoute;
