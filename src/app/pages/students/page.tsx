'use client'

import Userslist from '@src/components/UsersList';
import { useFetchData } from '@src/services/useFetchData';
import { postData } from '@src/services/usePostData';

import Loading from '@src/components/Loading';
import { useLoading } from '@src/store/useLoading';
import { socket } from '@src/utils/socketClient';
import { useEffect } from 'react';


export default function Users() {
  const { data } = useFetchData<any>('/api/tasks/GET/getUserStatus');
  const { loading } = useLoading();


  
  const email = localStorage.getItem('email');
  const dbSignout = async () => {
    await postData(
      '/api/tasks/POST/updateDutyStatus',
      ['email'],
      [email],
    )
  }; // use this when log out 


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
