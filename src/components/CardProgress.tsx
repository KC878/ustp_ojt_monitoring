import React from 'react';
import { Progress, Typography } from 'antd';

const { Text } = Typography;

const CardProgress = () => {
  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #d9d9d9',
        display: 'flex',
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center',     // Center content vertically
        height: '100%',           // Ensure the container takes full height
        flexDirection: 'column',  // Stack text and progress
        textAlign: 'center',      // Center text
      }}
    >
      {/* Circular progress */}
      <Progress
        type="circle"
        percent={49}
        width={120}  // Increase width for a larger circle
        strokeColor="#1890ff"
        format={percent => `${percent}%`}
      />

      {/* Text Labels below the circle */}
      <div style={{ marginTop: '16px' }}>
        <Text type="secondary" style={{ display: 'block' }}>
          Total 49 / 100 Hrs
        </Text>
        <Text strong type="secondary">
          49% Completed
        </Text>
      </div>
    </div>
  );
};

export default CardProgress;
