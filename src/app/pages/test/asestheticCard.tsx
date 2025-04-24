'use client'

import React from 'react';
import { Card, Avatar, Button, Progress, Space, Typography } from 'antd';
import {
  EditOutlined,
  UserOutlined,
  SettingOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

interface ProfileCardProps {
  name: string;
  role: string;
  completion: number;
  avatarUrl?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  completion,
  avatarUrl,
}) => {
  const handleEdit = () => {
    alert(`Edit profile for ${name}`);
  };

  const handleSettings = () => {
    alert(`Open settings for ${name}`);
  };

  const handleMore = () => {
    alert(`More options for ${name}`);
  };

  return (
    <Card
      hoverable
      style={{
        width: 300,
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
      actions={[
        <SettingOutlined key="setting" onClick={handleSettings} />,
        <EditOutlined key="edit" onClick={handleEdit} />,
        <EllipsisOutlined key="ellipsis" onClick={handleMore} />,
      ]}
    >
      <Space direction="vertical" align="center" style={{ width: '100%' }}>
        <Avatar
          size={64}
          src={avatarUrl}
          icon={!avatarUrl && <UserOutlined />}
          style={{ backgroundColor: '#87d068' }}
        />
        <Title level={4} style={{ margin: 0 }}>
          {name}
        </Title>
        <Text type="secondary">{role}</Text>

        <div style={{ width: '100%', marginTop: 20 }}>
          <Text strong>Project Completion</Text>
          <Progress
            percent={completion}
            status={completion < 100 ? 'active' : 'success'}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>

        <Button type="primary" block onClick={() => alert(`Viewing ${name}'s profile`)}>
          View Profile
        </Button>
      </Space>
    </Card>
  );
};

export default ProfileCard;
