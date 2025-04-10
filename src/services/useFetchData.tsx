import { useEffect, useState } from 'react';

export const useFetchData = <T,>(apiPage: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiPage]);

  return {
    data,
    loading,
    error,
  };
};
