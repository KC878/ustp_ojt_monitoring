'use client';

import React from 'react';
import { useEffect } from 'react';

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
// import { useSocketIO } from '@src/services/useSocketIO';

import { socket } from '@src/utils/socketClient';
import { useMiddleware } from '@src/services/useMiddleware';

const LoginPage = () => {
  const { authAction, setAuthAction } = useAuthMiddleware();
  const { 
    loading, setLoading,
    refreshWindow,

  } = useLoading();
  const { form } = useForm(); 

  const [messageApi, contextHolder] = notification.useNotification();
  const { isAuthenticated } = useMiddleware();
  

  // const { socket } = useSocketIO();

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
    
    if(refreshWindow){
      
      window.location.reload(); //
    }
    
  }, [refreshWindow])

  
  useEffect(() => {
    localStorage.setItem('room', "Logicbase"); // store the room to localStorage to persist

    const defaultRoom = localStorage.getItem('room');
    const userName = localStorage.getItem('name');
    const userEmail = localStorage.getItem('email'); // store to localStorage to persist data even if refresh

    if(isAuthenticated) {
      socket.emit('join-room', {
        room: defaultRoom,
        name: userName,
        email: userEmail,
      })
      
      // listener for user-joined
    

    }
    console.log("From AUTH: ", defaultRoom);
    return () => {
      // socket.off("user_joined");
      // socket.off("messages");
    }
  }, [isAuthenticated]);


  // submission form
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

                if(user.duty === 'completed'){
                  localStorage.setItem('allow-logout', 'true'); // so that when user signs in and also log out directly is allowed 
                }

                

                messageApi.success({
                  message: messages.SUCCESS.LOGIN,  // Title
                  description: `
                    Token: ${loginToken}
                    User: ${user.name}
                    Email: ${user.email}
                  `,
                  placement: 'topRight',  // Notification position
                });

                // store result token and user to localStorage
                localStorage.setItem('token', loginToken);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('email', user.email);
                localStorage.setItem('name', user.name);

              
                setLoading(true);
                router.push('/pages/dashboard'); // redirect the page after login
                // setLoading set loading logic in this par

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
              } else if (response.message === messages.ERROR.DONE_DUTY){
                messageApi.info({
                  message: `User Status: ${messages.ERROR.DONE_DUTY} --> ${email}`,
                  placement: 'topRight',
                })

              } else {
                // // Fallback in case no message is provided
                const compare = messages.ERROR.DONE_DUTY === 'Duty Complete'; 
                alert(compare);
                messageApi.error({
                  message: 'An unexpected error occurred.',
                  placement: 'topRight',
                }); //////
              }
          } 
        }catch{
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