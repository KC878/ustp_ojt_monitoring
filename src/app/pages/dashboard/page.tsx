'use client'


import Dashboard from '../../../components/Dashboard';
import Userslist from '@src/components/UsersList';

import ProtectedRoute from '@src/middleware/ProtectedRoute';
import { useLoading } from '@src/store/useLoading';


import React, { useState, useEffect } from 'react';


const DashboardPage = () => {
  const [headerContent, setHeaderContent] = useState<string>('Dashboard'); // type string and default Dashboard
  const { setLoading } = useLoading(); // get loading state

  const menuPages = [
    <div key="dashboard"><h1>Dashboard </h1></div>,
    <div key="student"><Userslist /></div>,
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

  // useStates 
  return(
    <ProtectedRoute>

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


