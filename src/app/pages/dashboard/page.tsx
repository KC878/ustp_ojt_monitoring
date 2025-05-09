'use client'


import Dashboard from '@src/components/Dashboard';
import Users from '@src/app/pages/users/page';
import StatisticsPage from '@src/app/pages/statistics/page';

import ProtectedRoute from '@src/middleware/ProtectedRoute';
import { useLoading } from '@src/store/useLoading';
import { notification } from 'antd';

import React, { useState, useEffect } from 'react';
import { socket } from '@src/utils/socketClient';
import { useAuth } from '@src/store/useAuth';
import { useMiddleware } from '@src/services/useMiddleware';

const DashboardPage = () => {
  const [headerContent, setHeaderContent] = useState<string>('Dashboard'); // type string and default Dashboard
  const { setLoading } = useLoading(); // get loading state
  const { logout, setLogout } = useAuth();
  const [messageApi, contextHolder] = notification.useNotification();
  const { isAuthenticated } = useMiddleware();

  const menuPages = [
    <div key="users"><Users /></div>, // default display
    <div key="satistics"><StatisticsPage/></div>
  ];
  // pass Array of components
  const menuItems = [
    'Dashboard',
    'Statistics',
  ]
 
  const footerContent = 'OJT Monitoring System - Cagadas USTP';

  // This runs once when dashboard is rendered
  useEffect(() => {
    // give slight delay to simulate "fully mounted"
    const timeout = setTimeout(() => {
      setLoading(false); // ✅ Hide the loading screen now
    }, 2000); // or adjust if needed

    return () => clearTimeout(timeout); // cleanup
  }, []);

  useEffect(() => {
    socket.on('user-logout', (message: string) => { // receiver -> receives email in a message
      console.log(`>>>>>>>>>>>> <<<<<<<<<<<<<<<`);
      messageApi.info({
        message: '🔔 Signout out... ',  // Title
        description: message,  // Detailed message
        placement: 'topRight',  // Notification position
      });
      // alert(message);

      setLogout(false);
    })

    return () => {
      socket.off('user-logout');
    };
  }, [logout])

  
  useEffect(() => {
    socket.on('user-joined', (message: string, activeUsers: string[]) => {
      // alert(`${message}`);
      // alert(activeUsers);
      messageApi.info({
        message: `🔔 Signing in...`,  // Title
        description: message,  // Detailed message
        placement: 'topRight',  // Notification position
      });
  
    })

    return () => {
      socket.off('user-joined');
    };
  }, [isAuthenticated])


  // alert(localStorage.getItem('roleID'));
  // useStates 
  return(
    <ProtectedRoute>
      {contextHolder}
      <Dashboard 
        menuItems={menuItems} 
        
        headerContent={headerContent}
        setHeaderContent={setHeaderContent}

        menuPages={menuPages}

        footerContent={footerContent}
      /> 
    </ProtectedRoute>
    
  );
}


export default DashboardPage;


