'use client'

import Userslist from '@src/components/UsersList';
import { useFetchData } from '@src/services/useFetchData';

import Loading from '@src/components/Loading';
import { useLoading } from '@src/store/useLoading';
import { useEffect } from 'react';
import { useFinish } from '@src/store/useFinish';
import { socket } from '@src/utils/socketClient';
import { GetUserStatus } from '@src/utils/interfaces';


export default function Users() {
  const { data } = useFetchData<GetUserStatus>('/api/tasks/GET/getUserStatus');
  const { loading } = useLoading();

  const { 
    setReload,
   } = useFinish(); // save to database

  
  // crucial 
  useEffect(() => {
    socket.on('user-status', () => {
      setReload(true);
    })
    
  }, []) // to reload other page

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
