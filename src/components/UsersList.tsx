import React, { useEffect, useState } from 'react';
import { Avatar, List, Progress, Typography, Badge } from 'antd';
import VirtualList from 'rc-virtual-list';
import type { ProgressProps } from 'antd';
import CountdownTimer from './CountdownTimer';

const { Text } = Typography;

interface StudentType {
  userID: string;
  name: string;
  email: string;
  timeRenderd: number;
  status: string;
}


interface Props {
  data: StudentType[]
}



const Userslist: React.FC<Props>= ( { data } ) => {


  
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
  

  // Get status color
  const getStatusColor = (status: string) => {
    if (status === 'Active') return 'green';
    else return 'red';
  };


  const nameTimer = localStorage.getItem('email') + 'Timer';
  
  return (
    <List>
      <VirtualList data={data} itemHeight={180} itemKey="userID">
        {(_, index: number) => (
          <List.Item key={data[index].userID}>
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
                {/* set condition if online --> green else: red/orange circle and show status */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: 'fit-content' }}>
                      <Avatar size={64} style={{ backgroundColor: '#3fa3da', fontSize: 35 }}>
                        {data[index].name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Badge
                        dot
                        // fix that later 
                        status={ data[index].status === 'active' ? 'success' : 'error'} // error is for offline
                        style={{
                          position: 'absolute',
                          bottom: -6,
                          right: -6,
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          boxShadow: '0 0 0 2px white',
                        }}
                      />
                    </div>
                  <Text type="secondary" style={{ marginTop: 8, color: data[index].status === 'active' ? 'green' : 'red'}}>
                        {data[index].status === 'active' ? 'Active' : 'Offline'}
                  </Text> 
                  {/* Color text */}
                </div>

                {/* User Info */}
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{data[index].name}</div>
                  <div style={{ fontSize: '14px', color: 'gray' }}>
                    <div>User ID: {data[index].userID}</div>
                    <div>Email: {data[index].email.toLowerCase()}</div>
                  </div>
                </div>
              </div>

              {/* ////////////////////////////////////////////////// */}

              

              {/* Right side: Progress Circles */}
              <div style={{ marginLeft: '120px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                {/* Display current date */}
                <Text type="secondary">Today</Text>
                {
                  data[index].status === 'active' ? (
                    <CountdownTimer timerKey={nameTimer}/>
                  ) : (
                    'User Is Offline'
                  )
                }
                
                
              </div>
            </div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default Userslist;
