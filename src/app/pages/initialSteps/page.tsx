'use client';

import { useState, useEffect } from 'react';
import InitialSteps from '@src/components/InitialSteps';
import ProtectedRoute from '@src/middleware/ProtectedRoute';
import { useAuth } from '@src/store/useAuth';
import { useFinish } from '@src/store/useFinish';
import { postData } from '@src/services/usePostData';
import { useFetchData } from '@src/services/useFetchData';


const StepsPage = () => {
  const { data, loading } = useFetchData<any>('/api/tasks/GET/getSchools'); // data get Schools 


  const {
    numValue, schoolID, schoolValue,

    setFirstLogin,
  } = useAuth();

  const {
    finishInitial, setFinishInitial,
  } = useFinish();


  
  // handle submission here 
  useEffect(() => {

    if (finishInitial){
      const dbInitial = async () => {
    
        const email = localStorage.getItem('email');
        await postData(
          '/api/tasks/POST/postInitialSteps',
          ['duration', 'schoolID', 'schoolName', 'email'], 
          [numValue, schoolID, schoolValue, email], // school value refers to School Name
        )
  
        setFinishInitial(false) // reset 
        setFirstLogin(false); // reset
      }

      dbInitial(); // callback function 
    }
  }, [finishInitial]) //  

  

  return(
    <ProtectedRoute>
      <InitialSteps schools={data} schoolsLoading={loading}/>
    </ProtectedRoute>
  )
}

export default StepsPage;