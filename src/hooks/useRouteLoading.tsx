'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoading } from '@src/store/useLoading';

const useRouteLoading = () => {
  const pathname = usePathname(); // detects path change
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true); // start loading when path changes

    const timeout = setTimeout(() => {
      setLoading(false); // stop loading after fake delay (simulate load finish)
    }, 2000); // adjust as needed

    return () => clearTimeout(timeout);
  }, [pathname]); // receiver 

  return loading;
};

export default useRouteLoading;
