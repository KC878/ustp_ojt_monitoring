'use client'

import Userslist from '@src/components/UsersList';
import { useFetchData } from '@src/services/useFetchData';
import Loading from '@src/components/Loading';
import { useLoading } from '@src/store/useLoading';
import { socket } from '@src/utils/socketClient';
import { useEffect } from 'react';
import { useFinish } from '@src/store/useFinish';

export default function Students() {
  const { data } = useFetchData<any>('/api/tasks/GET/getUserStatus');
  const { loading } = useLoading();
  const { reload, setReload } = useFinish();




  useEffect(() => {
    

    socket.on('user-status', (message: string) => {
      // alert(`${message} Reloading...`);

      // localStorage.setItem('active-users', JSON.stringify(activeUsers));

      // const storedUsers = JSON.parse(localStorage.getItem('active-users') || '[]');

      setReload(true); // trigger reloading fetch data 

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
