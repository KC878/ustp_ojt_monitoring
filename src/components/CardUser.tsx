import React, { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  Space,
} from 'antd';
import {
  FilePdfOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Logs } from '@src/utils/interfaces';
const { Title, Text } = Typography;

import PDFLogs from './PDFLogs';

interface Props {
  name: string;
  schoolID: string;
  dataLogs: Logs[];
}

const CardUser: React.FC<Props> = ({ name, schoolID, dataLogs }) => {
  const [activeKey, setActiveKey] = useState<string[]>(['1']);
  const [showPDF, setShowPDF] = useState<boolean>(false);

  const handleOpenPDFWindow = () => {
    setTimeout(() => {
      setShowPDF(false);
    }, 3000);
  };

  return (
    <>
      {showPDF ? (
        <PDFLogs name={name} logs={dataLogs} />
      ) : (
        <div
          style={{
            display: 'flex',
            gap: 16,
            position: 'relative',
            width: '100%',
            flex: 1,
            flexWrap: 'wrap', // Allow wrapping of content
            justifyContent: 'center', // Center the content
          }}
        >
          <Card
            hoverable={true}
            style={{
              width: '100%', // Full width of container
              maxWidth: '400px', // Max width for the card
              minWidth: '250px', // Minimum width for small screens
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              minHeight: '455px', // Minimum height for small screens
              maxHeight: '500px', // Maximum height to avoid overflow
              height: 'auto', // Allow the height to adjust based on content
            }}
            actions={[
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                key="pdf"
                onClick={() => {
                  handleOpenPDFWindow();
                  setShowPDF(true);
                }}
              >
                <FilePdfOutlined
                  style={{
                    fontSize: '30px',
                    marginBottom: '8px',
                  }}
                />
                <span>PDF</span>
              </div>,
            ]}
          >
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <Avatar
                size={250} // Adjusted size for smaller screens
                icon={<UserOutlined />}
                style={{ backgroundColor: '#87d068' }}
              />
              <Title level={4} style={{ margin: 0 }}>
                {name}
              </Title>
              <Text type="secondary">
                {schoolID !== null ? schoolID : 'Not Set'}
              </Text>
            </Space>
          </Card>
        </div>
      )}
    </>
  );
};

export default CardUser;
