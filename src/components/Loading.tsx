import { useEffect } from 'react';
import { Spin } from 'antd';

import { useLoading } from '@src/store/useLoading';
const Loading = () => {
  const { setLoading }= useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop showing spinner after 1 seconds (or any other logic)
    }, 1000);
    
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <> 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> 
          <Spin size='large' /> 
      </div>
    </>
   
  );
}

export default Loading;