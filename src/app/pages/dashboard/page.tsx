'use client'


import Dashboard from '../../../components/Dashboard';

import LogoutPage from '@src/app/pages/logout/page';

import ProtectedRoute from '@src/middleware/ProtectedRoute';



import React, { useState } from 'react';


const DashboardPage = () => {
  const [headerContent, setHeaderContent] = useState<string>('Dashboard'); // type string and default Dashboard

  const menuPages = [
    <div key="dashboard"><h1>Dashboard </h1></div>,
    <div key="student"><h1>Student </h1></div>,
    <div key="supervisor"> <h1> Supervisor </h1></div>,
    <div key="settings"><h1>Settings</h1></div>,
    <LogoutPage />
  ];
  // pass Array of components
  const menuItems = [
    'Dashboard',
    'Student',
    'Supervisor',
    'Settings',
    'Logout'
  ]
 
  const footerContent = 'OJT Monitoring System - Cagadas USTP';
  

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


