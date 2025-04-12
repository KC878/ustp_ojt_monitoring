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
import { useForm } from '@src/store/useForm';

import { postData } from '@src/services/usePostData';

import { messages } from '@src/utils/messages';

const LoginPage = () => {

  const { authAction, setAuthAction } = useAuthMiddleware();
  const { loading, setLoading } = useLoading();

  const { form } = useForm(); 

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
      const submit = async () => {

        try{
          if(authAction === 'signup') {
            const response = await postData(
              '/api/AUTH/signup',
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
              
              form?.resetFields();
              // setAuthAction('login'); // Forced to login after Successful Signup 
            }  ////// signup 


          } else if (authAction === 'login'){
              const response = await postData(
                '/api/AUTH/login',
                ['email', 'password'],
                [email, password],
              )
  
              if (response.ok) {
                messageApi.success({
                  message: messages.SUCCESS.LOGIN,  // Title
                  placement: 'topRight',  // Notification position
                });
              } else if (response.message === messages.ERROR.INVALID_EMAIL){
                  messageApi.error({
                    message: messages.ERROR.INVALID_EMAIL,
                    placement: 'topRight',
                  })
              } else if (response.message === messages.ERROR.INVALID_PASSWORD){
                messageApi.error({
                  message: messages.ERROR.INVALID_PASSWORD,
                  placement: 'topRight',
                })
              } else {
                // Fallback in case no message is provided
                messageApi.error({
                  message: 'An unexpected error occurred.',
                  placement: 'topRight',
                }); //////
              }
          } 
        }catch (error){
          messageApi.error({
            message: 'Something went wrong during submission.',
            placement: 'topRight',
          });
        }finally {
          setFinishSubmit(false);
        }
      };
      
    
      submit();
      

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