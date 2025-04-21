import { useEffect, useState } from 'react';

import { useLoading } from '@src/store/useLoading';
import { useFinish } from '@src/store/useFinish';

export const useFetchData = <T,>(apiPage: string) => {
  const [data, setData] = useState<T[]>([]);
  const {loading, setLoading} = useLoading();
  const [error, setError] = useState<string | null>(null);
  const { reload, setReload } = useFinish();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(apiPage);
        if (!res.ok) throw new Error('Failed to fetch data');
        
        const result: T[] = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } 
    };

    
    setReload(false) // turn it off once run 
    fetchData();
  }, [apiPage, reload]);

  return {
    data,
    error,
    loading,
  };
};
