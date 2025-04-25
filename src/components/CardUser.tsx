
import React, { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  Collapse,
  Space,
  Progress,
} from 'antd';
import {
  FilePdfOutlined,
  EllipsisOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const logsData = [
  { date: '2025-04-01', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
  { date: '2025-04-02', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
  { date: '2025-04-03', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
  { date: '2025-04-04', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
  { date: '2025-04-03', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
  { date: '2025-04-04', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
  { date: '2025-04-03', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
  { date: '2025-04-04', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
  { date: '2025-04-03', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
  { date: '2025-04-04', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },   
];

const CardUser: React.FC = () => {
  const [showLogs, setShowLogs] = useState(true);
  const [activeKey, setActiveKey] = useState<string[]>(['1']);

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
        <div
          style={{
            width: '400px',
            border: '1px solid #d9d9d9',
            borderRadius: 8,
            overflow: 'hidden',
            fontSize: '14px',
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              fontWeight: 'bold',
              padding: '10px 16px',
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #d9d9d9',
              paddingRight: '30px', // for scrollbar alignment
              boxSizing: 'border-box',
            }}
          >
            <Text style={{ flex: 1, textAlign: 'left' }}>Date</Text>
            <Text style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>Time In</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>Time Out</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>Hours</Text>
          </div>

  
          {/* Data Rows */}
          <div
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {logsData.map((log, index) => {
              const isLastItem = index === logsData.length - 1;
  
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    padding: '10px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    backgroundColor: '#fff',
                    boxSizing: 'border-box',
                  }}
                >
                  <Text style={{ flex: 1 }}>{log.date}</Text>
                  <Text style={{ flex: 1, textAlign: 'center' }}>{log.timeIn || '-'}</Text>
                  <Text style={{ flex: 1, textAlign: 'center' }}>{log.timeOut || '-'}</Text>
                  {isLastItem ? (
                    <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>Total</Text>
                  ) : (
                    <Text style={{ flex: 1, textAlign: 'right' }}>
                      {log.renderedHours || log.status || '-'}
                    </Text>
                  )}
                </div>
              );
            })}
          </div>
  
          {/* Footer */}
          <div
            style={{
              padding: '10px 16px',
              backgroundColor: '#f5f5f5',
              borderTop: '1px solid #d9d9d9',
              display: 'flex',
              flexDirection: 'column',  // Ensure elements stack vertically
            }}
          >
            {/* Progress bar aligned with other elements */}
            <Progress percent={49} strokeColor="#1890ff" showInfo={false} style={{ marginBottom: 8 }} />

            {/* Text for time rendered and percentage */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type='secondary'  >Total 49 / 100 Hrs</Text> 
              <Text type="secondary"  style={{ fontWeight: 'bold' }} >49%</Text>
            </div>
          </div>

        </div>
      ),
    },
  ];
  
  

  return (
    
    <div style={{ display: 'flex', gap: 16 }}>
      <Card
        hoverable={true}
        style={{
          width: 360,
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
        actions={[
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',  // Aligning icon and text vertically
              alignItems: 'center',     // Centering both icon and text
              cursor: 'pointer',
            }}
            key="pdf"
            onClick={handleOpenPDFWindow}
          >
            <FilePdfOutlined
              style={{
                fontSize: '30px',  // Adjust icon size here (increase or decrease)
                marginBottom: '8px', // Space between icon and label
              }}
            />
            <span>PDF</span>
          </div>,
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',  // Aligning icon and text vertically
              alignItems: 'center',     // Centering both icon and text
              cursor: 'pointer',
            }}
            key="logs"
            onClick={() => {
              showLogs ? setShowLogs(false) : setShowLogs(true)
            }}
          >
            <EllipsisOutlined
              style={{
                fontSize: '30px',  // Adjust icon size here (increase or decrease)
                marginBottom: '8px', // Space between icon and label
              }}
            />
            <span>Logs</span>
          </div>,
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

      
      {/* display when clicking collapsable */}
      {showLogs && (
        <div style={{ width: 360 }}>
          <Collapse 
            bordered={false} 
            items={collapseItems} 
            activeKey={activeKey}  // Controlled by state
            onChange={(key) => setActiveKey(key as string[])}  // Use onChange to update the activeKey state
          />
        </div>
      )}
    </div>
  );
};

export default CardUser;
