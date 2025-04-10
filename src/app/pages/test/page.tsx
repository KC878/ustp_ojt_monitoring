'use client';

import React from 'react';
import Login from '@src/components/Login';

export default function Home() {
  function handleClick() {
    window.location.replace('/dashboard'); // Typically, use '/dashboard' instead of '/pages/dashboard'
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gray-100'>
      <div className='h-32 w-32 bg-blue-600 text-white flex justify-center items-center border border-gray-400'>
        Element
      </div>
    </div>
  );
}
