'use client';

import React from 'react';

export default function Home() {
  function handleClick() {
    window.location.replace('/pages/dashboard');
  }

  return (
    <>
      <button onClick={handleClick}>Login</button>
    </>
  );
}
