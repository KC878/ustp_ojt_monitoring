'use client';

import React from 'react';
import { useState, useEffect } from 'react';

import { useLoading } from '@src/store/useLoading';

import Login from '@src/components/Login';
import Signup from '@src/components/Signup';

import Loading from  '@src/components/Loading';

import { useAuth, useAuthMiddleware } from '@src/store/useAuth';
import { useFinish } from '@src/store/useFinish';
import { notification } from 'antd';

import { postData } from '@src/services/usePostData';

import { messages } from '@src/utils/messages';

const LoginPage = () => {

  const { authAction, setAuthAction } = useAuthMiddleware();
  const { loading } = useLoading();

  const [messageApi, contextHolder] = notification.useNotification();

  const { 
      userID, // didicated Global State for userID -> 
      name,
      email,
      password,
      roleID,
      created_at,


    } = useAuth();
  
  const { finishSubmit, setFinishSubmit } = useFinish(); // declarer



  useEffect(() => {
    if (finishSubmit) {


      alert(` API - Insert --> User
        
      `); // before insert current time 

      const submit = async () => {
        const response = await postData(
          '/api/POST/addUser',
          [
            'userID',
            'name',
            'email',
            'password',
            'roleID',
            'created_at',
          ], // columns
          [
            userID, // didicated Global State for userID -> 
            name,
            email,
            password,
            roleID,
            created_at,
          ],  // values
        );
  
        if (response.ok) {
        
          messageApi.success({
            message: 'User Added Succesfully Added',  // Title
            description: `User ID: ${userID} has been successfully added!`,  // Detailed message
            placement: 'topRight',  // Notification position
          });
        } 
      };
      
    
      submit();
      setFinishSubmit(false);

      // loading first 
      // setAuthAction('login'); // Forced to login after Successful Signup 
      

    }
  }, [finishSubmit]);

  

  return (
    <>
      {contextHolder}
      {
        loading ? (
          <Loading />
        ) : (
          authAction === 'login' ? (
            <Login />
          ) : authAction === 'signup' ? (
            <Signup />
          ) : null
        )
      }

    </>
  );
}


export default LoginPage;