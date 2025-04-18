'use client'

import Userslist from '@src/components/UsersList';
import { useFetchData } from '@src/services/useFetchData';
import Loading from '@src/components/Loading';
import { useLoading } from '@src/store/useLoading';

export default function Students() {
  const { data } = useFetchData<any>('/api/tasks/GET/getUserStatus');
  const { loading } = useLoading();

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
