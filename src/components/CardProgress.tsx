import React from 'react';
import { Progress, Typography } from 'antd';
import { getRenderedPercentage } from '@src/utils/getRenderedPercentage';

const { Text } = Typography;

interface Props {
  timeAccumulated: string;
  duration: string;

}
const CardProgress: React.FC<Props> = ({ timeAccumulated, duration }) => {


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
        percent={getRenderedPercentage(timeAccumulated, duration)}
        size={120}  // Increase width for a larger circle
        strokeColor= {getRenderedPercentage(timeAccumulated, duration) >= 100 ? '#00FF00' : "#1890ff"}
        format={percent => `${percent}%`}
      />

      {/* Text Labels below the circle */}
      <div style={{ marginTop: '16px' }}>
        <Text type="secondary" style={{ display: 'block' }}>
          {timeAccumulated} / {duration}
        </Text>
        <Text strong type="secondary">
          HH:MM:SS 
        </Text>
      </div>
    </div>
  );
};

export default CardProgress;
