'use client'

import Userslist from '@src/components/UsersList';
import { useFetchData } from '@src/services/useFetchData';


interface StudentType {
  userID: string;
  name: string;
  email: string;
}

export default function SocketTestPage() {
  const { data } = useFetchData<StudentType>('/api/tasks/GET/getUserStatus');


  return (
    <>
      <Userslist data={data}/>
    </>
  );
}
