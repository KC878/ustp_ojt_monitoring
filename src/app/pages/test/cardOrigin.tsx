'use client'

import { useEffect } from 'react';

import StatCard from '@src/components/Card';
import Loading from '@src/components/Loading';
import { useLoading } from '@src/store/useLoading';

const testPage = () => {
  // const [loading, setLoading] = useState(false);
  const { loading, setLoading } = useLoading(); // use loading that is use state only 

  return(

    <>
      {loading ? (
        <Loading /> // change to skeleton 
      ) : (
        <StatCard />
      )} 
      
    </>
    
  );

}


export default testPage;