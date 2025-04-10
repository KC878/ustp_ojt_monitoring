'use client';

import React from 'react';
import { useState, useEffect } from 'react';

import { useLoading } from '@src/store/useLoading';

import Login from '@src/components/Login';
import Loading from  '@src/components/Loading';


const LoginPage = () => {
  
  const { loading } = useLoading();

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          <Login /> 
        )
      }

    </>
  );
}


export default LoginPage;