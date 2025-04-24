'use client'

import React from 'react';
import { Card, Button, Dropdown, Menu, message } from 'antd';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const stats = [
  { title: 'Stats 1', value: 42 },
  { title: 'Stats 2', value: 75 },
  { title: 'Stats 3', value: 60 },
];

const actionsMenu = (
  <Menu>
    <Menu.Item key="1" icon={<SettingOutlined />}>
      Settings
    </Menu.Item>
    <Menu.Item key="2" icon={<EditOutlined />}>
      Edit
    </Menu.Item>
    <Menu.Item key="3" icon={<EllipsisOutlined />}>
      More Actions
    </Menu.Item>
  </Menu>
);

const CardList: React.FC = () => {
  const handleActionClick = (action: string) => {
    message.info(`Action: ${action} clicked!`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          style={{
            width: 300,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}
          hoverable
        >
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
            {stat.title}
          </div>
          <div style={{ fontSize: '24px', color: '#1890ff', marginBottom: '16px' }}>
            {stat.value}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              icon={<SettingOutlined />}
              shape="circle"
              size="small"
              onClick={() => handleActionClick('Settings')}
            />
            <Button
              icon={<EditOutlined />}
              shape="circle"
              size="small"
              onClick={() => handleActionClick('Edit')}
            />
            <Dropdown
              overlay={actionsMenu}
              trigger={['click']}
              onClick={(e) => handleActionClick(e.key)}
            >
              <Button
                icon={<EllipsisOutlined />}
                shape="circle"
                size="small"
              />
            </Dropdown>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
