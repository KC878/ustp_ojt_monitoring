'use client'


import Dashboard from '../../../components/Dashboard';

import ProtectedRoute from '@src/middleware/ProtectedRoute';

// importing pages
// import CashiersPage from '../cashiers/page';
// import TransactionsPage from '../transactions/page';

import React, { useState } from 'react';

const DashboardPage = () => {
  const [headerContent, setHeaderContent] = useState<string>('Dashboard'); // type string and default Dashboard

  const menuPages = [
    <div key="dashboard"><h1>Dashboard </h1></div>,
    <div key="student"><h1>Student </h1></div>,
    <div key="supervisor"> <h1> Supervisor </h1></div>,
    <div key="settings"><h1 className='settings'>Settings</h1></div>,
    <div key="logout"><h1 className='logout'>Logout</h1></div>,
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


