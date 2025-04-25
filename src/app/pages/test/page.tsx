'use client';

import React, { useState, useEffect } from 'react';
import CardSkeleton from '@src/components/CardSkeloton';
import CardUser from '@src/components/CardUser';


const TestPage: React.FC = () => {
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000) // listen two seconds 
  }, [])



  return(
    loading ? (
      <CardSkeleton />
    ) : (
      <CardUser />
    )
  );
};

export default TestPage;
