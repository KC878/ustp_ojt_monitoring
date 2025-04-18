import React, { useEffect, useState } from 'react';
import { Avatar, List, Progress, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';
import type { ProgressProps } from 'antd';

const { Text } = Typography;

interface DataType {
  userID: string;
  name: string;
  status: string;
}

const Userslist: React.FC = () => {
  const dummyData: DataType[] = [
    { userID: '1', name: 'Kent Christian', status: 'Active' },
    { userID: '2', name: 'Jane Doe', status: 'Inactive' },
    { userID: '3', name: 'John Smith', status: 'Pending' },
    { userID: '4', name: 'Alice Johnson', status: 'Active' },
    { userID: '5', name: 'Bob Brown', status: 'Inactive' },
  ];

  const [timeLeft, setTimeLeft] = useState(8 * 60 * 60); // 8 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const conicColors: ProgressProps['strokeColor'] = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  const totalSeconds = 8 * 60 * 60;
  const renderedPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100; // fetch from database -
  // updates every hour --> 

  return (
    <List>
      <VirtualList data={dummyData} itemHeight={180} itemKey="userID">
        {(item: DataType, index: number) => (
          <List.Item key={item.userID}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              width: '100%',
              gap: '30px',
              padding: '0 20px'
            }}>
              
              {/* Left side: User Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* Avatar and Time Text wrapped in a column */}
                  {/* set condition if online --> green else: red circle also show offlibe */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
                  <Avatar size={64} style={{ backgroundColor: 'forestgreen', fontSize: 35 }}>
                    {item.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Text type="secondary" style={{ marginTop: 8 }}>Active</Text> {/* Placed below the Avatar */}
                </div>

                {/* User Info */}
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ fontSize: '14px', color: 'gray' }}>
                      <div>User ID: {item.userID}</div>
                      <div>Email: {item.status}</div>
                    </div>

                </div>
              </div>


                {/* ////////////////////////////////////////////////// */}

              {/* Center --> overall Progress bar */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '350px' }}>
                  {/* Labels */}
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {/* Labels */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#666', marginBottom: 4 }}>
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{
                      width: '100%',
                      height: 16,
                      border: '1px solid #1890ff',
                      borderRadius: 4,
                      background: '#f0f0f0',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div 
                        key={index} // unique identifier for Hrs Required
                        style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${50}%`, // TOTAL Hrs required--> Entire OJT duration 
                        background: '#1890ff',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>
                  </div>

                  <Text type="secondary" style={{ marginTop: 8 }}>Hrs Required: {486} Hrs </Text>
                  <Text type="secondary" style={{ marginTop: 8 }}>Total Hrs rendered: {300} Hrs </Text>
                </div>
              </div>
              


              {/* ////////////////////////////////////////////////// */}
              {/* Right side: Progress Circles */}
              
              <div style={{ marginLeft: '120px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                {/* Display current date */}
                <Text type="secondary">Today</Text> 
                <div style={{ display: 'flex', gap: 20 }}>
                  <Progress type="circle" percent={30} size={80} strokeColor="#ff4d4f" />
                  <Progress
                    type="circle"
                    percent={0}
                    size={80}
                    format={() => '100%'}
                    strokeColor={conicColors}
                  />
                  <Progress type="circle" percent={90} size={80} strokeColor="#52c41a" />
                </div>
                <Text type="secondary">{formatTime(timeLeft)}</Text>
              </div>
            </div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default Userslist;
