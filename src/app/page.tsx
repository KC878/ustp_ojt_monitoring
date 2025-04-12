'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/pages/auth');
    }
  }, []);

  return null; // or loading spinner while redirecting
}
