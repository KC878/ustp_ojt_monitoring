
import { useEffect, useState } from 'react';
import { Progress, Typography } from 'antd';
import React from 'react';


interface Props {
  timerKey: string;
}

const CountdownTimer: React.FC<Props> = ({ timerKey }) => {
  const [percent, setPercent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const { Text } = Typography;

  const COUNTDOWN_KEY = timerKey; // make this global st condition -- to run if user logged in
                                  // also set condition if user is only active RUN THE TIMER -> 
  const COUNTDOWN_HOURS = 8;
  const COUNTDOWN_SECONDS = COUNTDOWN_HOURS * 60;

  useEffect(() => {
    let expiryTime = localStorage.getItem(COUNTDOWN_KEY);

    if (!expiryTime) {
      const now = Date.now();
      const expiry = now + COUNTDOWN_SECONDS * 1000;
      localStorage.setItem(COUNTDOWN_KEY, expiry.toString());
      expiryTime = expiry.toString();
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const expireAt = parseInt(localStorage.getItem(COUNTDOWN_KEY) || '0', 10);

      const remainingTime = Math.floor((expireAt - now) / 1000);

      if (remainingTime <= 0) {
        setTimeLeft(0);
        setPercent(100);
        clearInterval(interval);
        localStorage.removeItem(COUNTDOWN_KEY);
      } else {
        const elapsedTime = COUNTDOWN_SECONDS - remainingTime;
        const progress = Math.floor((elapsedTime / COUNTDOWN_SECONDS) * 100);
        setTimeLeft(remainingTime);
        setPercent(progress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [COUNTDOWN_KEY]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Progress
        type="circle"
        percent={percent}
        strokeColor="#52c41a"
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
