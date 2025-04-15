import React from 'react';
import { Button, Popover } from 'antd';

interface ProfileProps {
  name: string
  popoverContent: React.ReactNode;
}

const Profile: React.FC<ProfileProps> = ({ name, popoverContent}) => {
  return (
    <Popover content={popoverContent} trigger="hover">
      <Button
        type="primary"
        shape="circle"
        style={{
          backgroundColor: "#007bff",
          border: "none",
        }}
      >
        {name.charAt(0).toUpperCase()}
      </Button>
    </Popover>
  );
};

export default Profile;
