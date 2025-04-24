'use client';

import React, { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  List,
  Collapse,
  Space,
  Drawer,
  Statistic,
} from 'antd';
import {
  EllipsisOutlined,
  UserOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { Bar } from '@ant-design/charts';

const { Title, Text } = Typography;

const logsData = [
  { date: '2025-04-01', status: 'Present' },
  { date: '2025-04-02', status: 'Absent' },
  { date: '2025-04-03', status: 'Late' },
  { date: '2025-04-04', status: 'Present' },
];

const ExpandableAttendanceCard: React.FC = () => {
  const [showLogs, setShowLogs] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const countStatus = (status: string) =>
    logsData.filter((log) => log.status === status).length;

  const collapseItems = [
    {
      key: '1',
      label: 'Attendance Logs',
      children: (
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
      ),
    },
    {
      key: '2',
      label: 'User Info',
      children: (
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
      ),
    },
  ];

  const chartData = [
    {
      status: 'Present',
      count: countStatus('Present'),
    },
    {
      status: 'Absent',
      count: countStatus('Absent'),
    },
    {
      status: 'Late',
      count: countStatus('Late'),
    },
  ];

  const config = {
    data: chartData,
    xField: 'count',
    yField: 'status',
    seriesField: 'status',
    colorField: 'status',
    legend: false,
    barWidthRatio: 0.5,
    height: 200,
  };

  return (
    <>
      <Card
        style={{
          width: 360,
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
        actions={[
          <EllipsisOutlined key="logs" onClick={() => setShowLogs(!showLogs)} />,
          <BarChartOutlined key="stats" onClick={() => setShowStats(true)} />,
        ]}
      >
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#87d068' }}
          />
          <Title level={4} style={{ margin: 0 }}>
            Kent Cagadas
          </Title>
          <Text type="secondary">4th Year IT Student</Text>
        </Space>

        {showLogs && (
          <Collapse
            style={{ marginTop: 20 }}
            bordered={false}
            items={collapseItems}
          />
        )}
      </Card>

      <Drawer
        title="Attendance Statistics"
        placement="right"
        onClose={() => setShowStats(false)}
        open={showStats}
        width={360}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Statistic title="Present" value={countStatus('Present')} />
          <Statistic title="Absent" value={countStatus('Absent')} />
          <Statistic title="Late" value={countStatus('Late')} />
          <Bar {...config} />
        </Space>
      </Drawer>
    </>
  );
};

export default ExpandableAttendanceCard;
