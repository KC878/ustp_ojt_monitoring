'use client'

import Userslist from '@src/components/UsersList';
import { useFetchData } from '@src/services/useFetchData';
import { postData } from '@src/services/usePostData';

import Loading from '@src/components/Loading';
import { useLoading } from '@src/store/useLoading';
import { socket } from '@src/utils/socketClient';
import { useEffect } from 'react';
import { useFinish } from '@src/store/useFinish';
export default function Students() {
  const { data } = useFetchData<any>('/api/tasks/GET/getUserStatus');
  const { loading } = useLoading();

  const { 
    setReload,
    signOut, setSignOut, // listener if the Duty Time is finished 

   } = useFinish(); // save to database


   
  const email = localStorage.getItem('email');
   //
  const dbSignout = async () => {
    await postData(
      '/api/tasks/POST/updateDutyStatus',
      ['email'],
      [email],
    )
  }; // no more message // run this with an on click --> create modal you have finished rendering --> set modal confirm then complete 

  // remove that --> only

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
