
'use client'

import React, { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  List,
  Button,
  Collapse,
  Space,
} from 'antd';
import {
  EllipsisOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const logsData = [
  { date: '2025-04-01', status: 'Present' },
  { date: '2025-04-02', status: 'Absent' },
  { date: '2025-04-03', status: 'Late' },
  { date: '2025-04-04', status: 'Present' },
];

const ExpandableCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      style={{
        width: 350,
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      }}
      actions={[
        <EllipsisOutlined key="more" onClick={() => setExpanded(!expanded)} />,
      ]}
    >
      <Space direction="vertical" align="center" style={{ width: '100%' }}>
        <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
        <Title level={4} style={{ margin: 0 }}>
          Kent Cagadas
        </Title>
        <Text type="secondary">4th Year IT Student</Text>
      </Space>

      {expanded && (
        <Collapse defaultActiveKey={['1']} style={{ marginTop: 20 }}>
          <Panel header="Attendance Logs" key="1">
            <List
              size="small"
              dataSource={logsData}
              renderItem={(log) => (
                <List.Item>
                  <Text>{log.date}</Text>
                  <Text strong style={{ marginLeft: 'auto' }}>
                    {log.status}
                  </Text>
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      )}
    </Card>
  );
};

export default ExpandableCard;
