'use client';

import { useEffect, useState } from 'react';

const COUNTDOWN_KEY = 'countdown_expiry_time';
const COUNTDOWN_HOURS = 8;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Step 1: Get or set expiration time
    let expiryTime = localStorage.getItem(COUNTDOWN_KEY);

    if (!expiryTime) {
      const now = Date.now();
      const expiry = now + COUNTDOWN_HOURS * 60 * 60 * 1000; // 8 hours in ms
      localStorage.setItem(COUNTDOWN_KEY, expiry.toString());
      expiryTime = expiry.toString();
    }

    // Step 2: Start interval to update the timer
    const interval = setInterval(() => {
      const now = Date.now();
      const expireAt = parseInt(localStorage.getItem(COUNTDOWN_KEY) || '0');

      const diff = Math.floor((expireAt - now) / 1000); // in seconds

      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
        localStorage.removeItem(COUNTDOWN_KEY); // optional: clear storage
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-2xl font-bold text-red-600">
      {formatTime(timeLeft)}
    </div>
  );
}
