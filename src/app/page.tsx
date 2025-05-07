'use client';

import { useEffect } from 'react';
import '@ant-design/v5-patch-for-react-19';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/pages/auth');
    }
  }, []);

  return null; // or loading spinner while redirecting
}
