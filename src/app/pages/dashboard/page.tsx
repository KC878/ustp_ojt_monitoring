'use client'


import Dashboard from '../../../components/Dashboard';
import Students from '@src/app/pages/students/page';

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
    <div key="dashboard"><h1>Dashboard </h1></div>,
    <div key="student"><Students /></div>,
    <div key="supervisor"> <h1> Supervisor </h1></div>,
    <div key="settings"><h1>Settings</h1></div>,
  ];
  // pass Array of components
  const menuItems = [
    'Dashboard',
    'Student',
    'Supervisor',
    'Settings',
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
      alert(activeUsers);
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


