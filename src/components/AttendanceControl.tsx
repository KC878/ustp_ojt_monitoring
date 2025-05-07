import React from 'react';
import { Button, Row, Col, Typography, Space } from 'antd';
import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  CloseCircleTwoTone,
  QuestionCircleTwoTone,
} from '@ant-design/icons';

const { Text } = Typography;

const AttendanceControl: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '12px',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Row 1: Buttons - 30% Height */}
      <div
        style={{
          flex: '0 0 20%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Button
          type="default"
          size="large"
          style={{ fontSize: '20px', color: '#faad14', borderColor: '#faad14', width: 200, height: 150 }}
        >
          ON LEAVE
        </Button>
        <Button type="default" danger size="large" style={{ fontSize: '20px', width: 200, height: 150 }}>
          ABSENT
        </Button>
      </div>

      {/* Row 2: Status Overview - 70% Height */}
      <div
        style={{
          flex: '0 0 80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          marginTop: '16px',
          flexDirection: 'column',
        }}
      >
        <Space direction="vertical" align="center">
          {/* Default: Idle Status */}
          <QuestionCircleTwoTone twoToneColor="#d9d9d9" style={{ fontSize: 350 }} />

          <Text strong style={{ fontSize: 24, color: '#999' }}>
            Idle
          </Text>
        </Space>
      </div>
    </div>
  );
};

export default AttendanceControl;
