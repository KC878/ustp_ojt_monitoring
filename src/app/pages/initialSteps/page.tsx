'use client';

import { useState, useEffect } from 'react';
import InitialSteps from '@src/components/InitialSteps';
import ProtectedRoute from '@src/middleware/ProtectedRoute';
import { useAuth } from '@src/store/useAuth';
import { useFinish } from '@src/store/useFinish';
import { postData } from '@src/services/usePostData';

const StepsPage = () => {
  const {
    numValue, schoolValue,
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
          ['duration', 'schoolID', 'email'],
          [numValue, schoolValue, email],
        )
  
        setFinishInitial(false) // reset 
        setFirstLogin(false); // reset
      }

      dbInitial(); // callback function 
    }
  }, [finishInitial]) //  
   


  return(
    <ProtectedRoute>
      <InitialSteps />
    </ProtectedRoute>
  )
}

export default StepsPage;