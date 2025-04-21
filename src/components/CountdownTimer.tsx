import React, { useEffect, useState } from 'react';
import { Progress, Typography } from 'antd';

interface Props {
  timerKey: string;  // Not really needed anymore but can keep for uniqueness if reused
  timeIn: string;    // Expecting this to be a timestamp (in ms)
}

const CountdownTimer: React.FC<Props> = ({ timeIn }) => {
  const [percent, setPercent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const { Text } = Typography;

  const COUNTDOWN_HOURS = 8;
  const COUNTDOWN_SECONDS = COUNTDOWN_HOURS * 60 //* 60; // 8 hours = 28800 seconds // 8 minutes

  useEffect(() => {
    const startTime = Number(timeIn); // make sure this is a valid timestamp
    const expiryTime = startTime + COUNTDOWN_SECONDS * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const remainingTime = Math.floor((expiryTime - now) / 1000);

      if (remainingTime <= 0) {
        setTimeLeft(0);
        setPercent(100);
        clearInterval(interval);
      } else {
        const elapsedTime = COUNTDOWN_SECONDS - remainingTime;
        const progress = Math.floor((elapsedTime / COUNTDOWN_SECONDS) * 100);
        setTimeLeft(remainingTime);
        setPercent(progress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeIn]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  const color = (percent: number) => {
    if(percent < 25){
      return '#ff4d4f';
    }else if(percent < 50){
      return '#fa8c16';
    }else if(percent < 75){
      return '#fadb14';
    }else{
      return '#52c41a';
    }
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <Progress
        type="circle"
        percent={percent}
        strokeColor={color(percent)}
        size={100}
      />
      <Text type="secondary" style={{ display: 'block', marginTop: 10 }}>
        {percent < 100
          ? `Time left: ${formatTime(timeLeft)}`
          : 'Duty Time Rendered!'}
      </Text>
    </div>
  );
};

export default CountdownTimer;
