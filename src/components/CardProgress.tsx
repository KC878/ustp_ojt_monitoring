import React from 'react';
import { Progress, Typography } from 'antd';
import { getRenderedPercentage } from '@src/utils/getRenderedPercentage';

const { Text } = Typography;

interface Props {
  timeAccumulated: string;
  duration: string;
}

const CardProgress: React.FC<Props> = ({ timeAccumulated, duration }) => {
  // Get percentage from rendered time and duration
  const percent = getRenderedPercentage(timeAccumulated, duration);

  // Function to determine color based on percentage
  const color = (percent: number) => {
    if (percent <= 10) return '#ff4d4f';    // Bright Red
    if (percent <= 20) return '#ff7043';    // Red-Orange
    if (percent <= 30) return '#ff8c1a';    // Orange
    if (percent <= 40) return '#ffaa00';    // Amber
    if (percent <= 50) return '#ffc107';    // Yellow-Orange
    if (percent <= 60) return '#ffeb3b';    // Yellow
    if (percent <= 70) return '#cddc39';    // Lime Yellow-Green
    if (percent <= 80) return '#a4d144';    // Soft Lime Green
    if (percent <= 90) return '#7cb342';    // Mid-Green
    return '#52c41a';                       // Bright Green
  };

  return (
    <div
      style={{
        padding: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
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
        percent={percent}
        size={250}  // Increase width for a larger circle
        strokeColor={color(percent)}  // Dynamic color based on percentage
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
