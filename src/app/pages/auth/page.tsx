'use client';

import React from 'react';
import { useState, useEffect } from 'react';

import { useLoading } from '@src/store/useLoading';

import Login from '@src/components/Login';
import Signup from '@src/components/Signup';

import Loading from  '@src/components/Loading';

import { useAuthMiddleware } from '@src/store/useAuth';

const LoginPage = () => {

  const { authAction } = useAuthMiddleware();
  
  const { loading } = useLoading();

  return (
    <>
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