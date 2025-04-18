import React, { useEffect, useState } from 'react';
import { Avatar, List, Typography, Progress } from 'antd';

interface DataType {
  userID: string;
  name: string;
  status: string;
  duration: number; // duration in seconds
}

const Userslist: React.FC = () => {
  const dummyData: DataType[] = [
    { userID: '1', name: 'Kent Christian', status: 'Active', duration: 60 },
    { userID: '2', name: 'Jane Doe', status: 'Inactive', duration: 45 },
    { userID: '3', name: 'John Smith', status: 'Pending', duration: 30 },
    { userID: '4', name: 'Alice Johnson', status: 'Active', duration: 90 },
    { userID: '5', name: 'Bob Brown', status: 'Inactive', duration: 120 },
  ];

  const [timers, setTimers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Initialize timers with full duration
    const initialTimers: { [key: string]: number } = {};
    dummyData.forEach((user) => {
      initialTimers[user.userID] = user.duration;
    });
    setTimers(initialTimers);

    // Set up interval to decrement timers every second
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers: { [key: string]: number } = {};
        Object.keys(prevTimers).forEach((key) => {
          updatedTimers[key] = Math.max(prevTimers[key] - 1, 0);
        });
        return updatedTimers;
      });
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={dummyData}
      renderItem={(item) => {
        const remainingTime = timers[item.userID] || 0;
        const percent = (remainingTime / item.duration) * 100;

        return (
          <List.Item key={item.userID}>
            <List.Item.Meta
              avatar={
                <div style={{ textAlign: 'center' }}>
                  <Avatar style={{ backgroundColor: '#52c41a' }}>
                    {item.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <div style={{ marginTop: 4 }}>
                    <Progress
                      type="circle"
                      percent={percent}
                      width={40}
                      strokeColor="#52c41a"
                      format={() => `${remainingTime}s`}
                    />
                  </div>
                </div>
              }
              title={<Typography.Text strong>{item.name}</Typography.Text>}
              description={`Status: ${item.status}`}
            />
          </List.Item>
        );
      }}
    />
  );
};

export default Userslist;
