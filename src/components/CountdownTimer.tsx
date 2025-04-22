import React, { useEffect, useState } from 'react';
import { Progress, Typography } from 'antd';
import { useFinish } from '@src/store/useFinish';

interface Props {
  timeIn: string;    // Expecting this to be a timestamp (in ms)
  email: string;
}

const CountdownTimer: React.FC<Props> = ({ timeIn, email }) => {
  const [percent, setPercent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const { setFinishDuty } = useFinish();

  const { Text } = Typography;

  const COUNTDOWN_HOURS = 8;
  const COUNTDOWN_SECONDS = COUNTDOWN_HOURS * 12 //* 60; // 8 hours = 28800 seconds 
                                                // 30 
                                                //60 = 8 minutes
                                              // 10 = 40 SECONDS
  useEffect(() => {
    const startTime = Number(timeIn); // make sure this is a valid timestamp
    const expiryTime = startTime + COUNTDOWN_SECONDS * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const remainingTime = Math.floor((expiryTime - now) / 1000);

      const userEmail = localStorage.getItem('email');
      if (remainingTime <= 0) {
        setTimeLeft(0);
        setPercent(100);
        clearInterval(interval);
        if(email === userEmail){
          setFinishDuty(true); // trigger finish duty 
          alert(`${userEmail} finished Duty!`);
        }
       
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
    if (percent <= 10) return '#ff4d4f';    // Bright Red
    if (percent <= 20) return '#ff7043';    // Red-Orange
    if (percent <= 30) return '#ff8c1a';    // Orange
    if (percent <= 40) return '#ffaa00';    // Amber
    if (percent <= 50) return '#ffc107';    // Yellow-Orange
    if (percent <= 60) return '#ffeb3b';    // Yellow
    if (percent <= 70) return '#cddc39';    // Lime Yellow-Green
    if (percent <= 80) return '#a4d144';    // Soft Lime Green
    if (percent <= 90) return '#7cb342';     // Mid-Green 
    
    return '#52c41a';                                          
  };
  
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
