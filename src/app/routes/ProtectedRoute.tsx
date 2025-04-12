
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthMiddleware } from "@src/services/useAuthMiddleware";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();
  const { isAuthenticated } = useAuthMiddleware();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // push to Dashboard page
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // for authentication




  return <>{children}</>;
};

export default ProtectedRoute;
