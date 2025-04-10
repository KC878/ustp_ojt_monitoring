'use client';

import React from 'react';
import Login from  '@src/components/Login';


export default function Home() {
  function handleClick() {
    window.location.replace('/pages/dashboard');
  }

  return (
    <>
      <Login />

    </>
  );
}
