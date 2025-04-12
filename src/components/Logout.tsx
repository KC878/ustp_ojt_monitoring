import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAuth } from '@src/store/useAuth'; 


const Logout: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Are you sure you want to logout?');

  const { logout, setLogout } = useAuth();

  const handleOk = () => {

    setTimeout(() => {
      setModalText('Clearing user data from local storage')
    }, 1000);
    setTimeout(() => {
      setModalText('Loggin out...'); // mimick Logging out loading 
      setOpen(false);
      setConfirmLoading(false);
    }, 1000)
    setConfirmLoading(true);

    
    
    setLogout(true); // 
    


  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default Logout;