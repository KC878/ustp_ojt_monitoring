import React, { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  Space,
} from 'antd';
import {
  FilePdfOutlined,
  EllipsisOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface Props {
  name: string;
  schoolID: string;
}

const CardUser: React.FC<Props> = ({ name, schoolID}) => {
  // const [showLogs, setShowLogs] = useState(true);
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

  
  return (
    <div style={{ display: 'flex', gap: 16, position: 'relative',  width: '350px', maxWidth: '100%'}}>
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
            onClick={() => setShowLogs(!showLogs)}
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
            {name}
          </Title>
          <Text type="secondary">{schoolID}</Text>
        </Space>
      </Card>

      {/* display when clicking collapsable */}
    </div>
  );
};

export default CardUser;
