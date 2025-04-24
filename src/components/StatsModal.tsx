import React from 'react';
import { Button, Modal } from 'antd';
import { useOpen } from '@src/store/useOpen'; // state manager for opening statModal


const StatsModal: React.FC = () => {


  const [loading, setLoading] = React.useState<boolean>(true);

  const { isStatModal, setStatModal } = useOpen();

  const showLoading = () => {
    setStatModal(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        title={<p>Loading Modal</p>}
        footer={
          <Button type="primary" onClick={showLoading}>
            Reload
          </Button>
        }
        loading={loading}
        open={isStatModal} // open listener
        onCancel={() => setStatModal(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default StatsModal;