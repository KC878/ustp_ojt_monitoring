'use client';

import React, { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  List,
  Collapse,
  Space,
} from 'antd';
import {
  FilePdfOutlined,
  EllipsisOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const logsData = [
  { date: '2025-04-01', timeIn: '09:05 AM', timeOut: '10:00 AM', status: 'Present' },
  { date: '2025-04-02', timeIn: '09:05 AM', timeOut: '10:00 AM', status: 'Absent' },
  { date: '2025-04-03', timeIn: '09:05 AM', timeOut: '10:00 AM', status: 'Late' },
  { date: '2025-04-04', timeIn: '09:05 AM', timeOut: '10:00 AM', status: 'Present' },
];

const ExpandableAttendanceCard: React.FC = () => {
  const [showLogs, setShowLogs] = useState(false);

  const handleOpenPDFWindow = () => {
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (newWindow) {
      const doc = newWindow.document;
      doc.write(`
        <html>
          <head>
            <title>Daily Attendance Logs</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h2 { margin-bottom: 16px; }
              ul { list-style-type: none; padding: 0; }
              li { border-bottom: 1px solid #ccc; padding: 8px 0; display: flex; justify-content: space-between; }
              button { margin-top: 20px; padding: 10px 20px; }
            </style>
          </head>
          <body>
            <h2>Daily Attendance Logs</h2>
            <ul>
              ${logsData
                .map(
                  (log) =>
                    `<li><span>${log.date}</span><strong>${log.status}</strong></li>`
                )
                .join('')}
            </ul>
            <button onclick="window.print()">Print</button>
          </body>
        </html>
      `);
      doc.close();
    }
  };

  const collapseItems = [
    {
      key: '1',
      label: 'Attendance Logs',
      children: (
        <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, overflow: 'hidden' }}>
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              fontWeight: 'bold',
              padding: '10px 16px',
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #d9d9d9',
            }}
          >
            <Text style={{ flex: 1, textAlign: 'left' }}>Date</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>Time In</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>Time Out</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>Status</Text>
          </div>
  
          {/* Data Rows */}
          <List
            dataSource={logsData}
            renderItem={(log) => (
              <List.Item
                style={{
                  display: 'flex',
                  padding: '10px 16px',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <Text style={{ flex: 1 }}>{log.date}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>{log.timeIn || '-'}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>{log.timeOut || '-'}</Text>
                <Text style={{ flex: 1, textAlign: 'right' }} strong>
                  {log.status}
                </Text>
              </List.Item>
            )}
          />
        </div>
      ),
    },
  ];
  
  

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Card
        style={{
          width: 360,
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
        actions={[
          <FilePdfOutlined key="pdf" onClick={handleOpenPDFWindow} />,
          <EllipsisOutlined key="logs" onClick={() => setShowLogs(!showLogs)} />,
        ]}
      >
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Avatar
            size={200}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#87d068' }}
          />
          <Title level={4} style={{ margin: 0 }}>
            Kent Cagadas
          </Title>
          <Text type="secondary">4th Year IT Student</Text>
        </Space>
      </Card>

      {showLogs && (
        <div style={{ width: 360 }}>
          <Collapse bordered={false} items={collapseItems} />
        </div>
      )}
    </div>
  );
};

export default ExpandableAttendanceCard;
