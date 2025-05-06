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

const CardUser: React.FC<Props> = ({ name, schoolID, dataLogs}) => {
  // const [showLogs, setShowLogs] = useState(true);
  const [activeKey, setActiveKey] = useState<string[]>(['1']);
  const [showPDF, setShowPDF] = useState<Boolean>(false);

  const handleOpenPDFWindow = () => { 
    setTimeout(() => {
      setShowPDF(false);
    }, 3000)
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
            width: '350px',
            maxWidth: '100%',
          }}
        >
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
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                key="pdf"
                onClick={ () => {
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
                size={200}
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
