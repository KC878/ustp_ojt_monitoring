'use client'

import Userslist from '@src/components/UsersList';
import { useFetchData } from '@src/services/useFetchData';
import Loading from '@src/components/Loading';
import { useLoading } from '@src/store/useLoading';
import { socket } from '@src/utils/socketClient';
import { useEffect } from 'react';

export default function Students() {
  const { data } = useFetchData<any>('/api/tasks/GET/getUserStatus');
  const { loading } = useLoading();




  useEffect(() => {
    

    socket.on('user-status', (activeUsers: string[]) => {

      localStorage.setItem('active-users', JSON.stringify(activeUsers));

      const storedUsers = JSON.parse(localStorage.getItem('active-users') || '[]');



      // store active users to localstorage

    });

    return () => {
          // Cleanup if necessary
      // socket.off('user-logout');
    };
  }, []);
  return (
    <> 
      {loading ? (
        <Loading />
      ) : (
        <Userslist data={data}/>
      )
    }
      
    </>
  );
}
