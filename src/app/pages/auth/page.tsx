'use client';

import React from 'react';
import { useState, useEffect } from 'react';

import { useLoading } from '@src/store/useLoading';
import { useRouter } from 'next/navigation';

import Login from '@src/components/Login';
import Signup from '@src/components/Signup';

import Loading from  '@src/components/Loading';

import { useAuth, useAuthMiddleware } from '@src/store/useAuth';
import { useFinish } from '@src/store/useFinish';
import { notification } from 'antd';
import { useForm } from '@src/store/useForm';

import { postData } from '@src/services/usePostData';

import { messages } from '@src/utils/messages';
import ProtectedRoute from '@src/middleware/ProtectedRoute';
import { useSocketIO } from '@src/services/useSocketIO';


const LoginPage = () => {
  const { authAction, setAuthAction } = useAuthMiddleware();
  const { loading, setLoading } = useLoading();
  const { form } = useForm(); 

  const [messageApi, contextHolder] = notification.useNotification();
  const { socket } = useSocketIO(); // this initializes and shares socket

  const { 
      userID, // didicated Global State for userID -> 
      name,
      email,
      password,
      roleID,
      created_at,


    } = useAuth();
  
  const { finishSubmit, setFinishSubmit } = useFinish(); // declarer
  
  const router = useRouter(); // initialize Router


  useEffect(() => {
    if (finishSubmit) {
      const submit = async () => {

         

        try{
          if(authAction === 'signup') {
            const response = await postData(
              '/api/auth/signup',
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
              setAuthAction('login'); // Forced to login after Successful Signup 
            }  ////// signup 


          } else if (authAction === 'login'){
              const response = await postData(
                '/api/auth/login',
                ['email', 'password'],
                [email, password],
              )
              
              if (response.ok) {
                // get the token and user from response data
                const loginToken = response.data.token;
                const user = response.data.user;

                messageApi.success({
                  message: messages.SUCCESS.LOGIN,  // Title
                  description: `
                    Token: ${loginToken}
                    User: ${user.name}
                  `,
                  placement: 'topRight',  // Notification position
                });

                // store result token and user to localStorage
                localStorage.setItem('token', loginToken);
                localStorage.setItem('user', JSON.stringify(user));

                
                router.push('/pages/dashboard'); // redirect the page after login
                // setLoading set loading logic in this part
                
                socket.emit('user_connected',{
                  name: user.name,
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
      <ProtectedRoute> 
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
      </ProtectedRoute>
      {/* wrap it on a protected Route */}
      

    </>
  );
}


export default LoginPage;