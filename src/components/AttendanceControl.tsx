import React, { useState } from 'react';
import { Button, Layout, Typography, Space } from 'antd';
import { QuestionCircleTwoTone, ClockCircleTwoTone, CloseCircleTwoTone, CheckCircleTwoTone,     } from '@ant-design/icons';
import { LeaveAbsentIfo } from '@src/utils/interfaces';
import { useLoading } from '@src/store/useLoading';

const { Text } = Typography;
const { Header } = Layout;

interface Props { 
  email: string;
  userID: string;
  handleLeaveAbsent: (info: LeaveAbsentIfo) => void;
}
const AttendanceControl: React.FC<Props> = ({ email, userID, handleLeaveAbsent }) => {
  const roleID = Number(localStorage.getItem('roleID'));
  // alert(roleID);

  // Separate hover states for each button
  const [hoverOnLeave, setHoverOnLeave] = useState(false);
  const [hoverAbsent, setHoverAbsent] = useState(false);
  
  const { setLoading } = useLoading();
  const [onLeaveLoad, setOnLeaveLoad] = useState(false);
  const [onAbsentLoad, setOnAbsentLoad] = useState(false);

  const [status, setStatus] = useState(''); // to hold attendanceStatus icon

  const handleClick = (status: string) => {
    // setLoading(true);
    handleLeaveAbsent({
      email,
      userID,
      attendanceStatus: status,
    });
    setTimeout(() => {
      if(status === 'onLeave'){
        setOnLeaveLoad(false);
      }
      if(status === 'absent'){
        setOnAbsentLoad(false);
      }
    }, 3000)
  }; // return the value to Page 

  
  const iconStyle = {
    fontSize: 'clamp(100px, 15vw, 250px)',
    width: '100%',
    maxWidth: '250px',
     height: 'auto',
  };
  
   // Map status to icon and text
   const getIconAndText = () => {
    switch (status) {
      case 'onLeave':
        return {
          icon: <ClockCircleTwoTone twoToneColor="#faad14" style={iconStyle} />, // yellow
          text: 'On Leave',
        };
      case 'absent':
        return {
          icon: <CloseCircleTwoTone twoToneColor="#ff4d4f" style={iconStyle} />, // red
          text: 'Absent',
        };
      case 'present':
        return {
          icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={iconStyle} />, // green
          text: 'Present',
        };
      default:
        return {
          icon: <QuestionCircleTwoTone twoToneColor="#d9d9d9" style={iconStyle} />, // gray (idle)
          text: 'Idle',
        };
    }
  };
  const { icon, text } = getIconAndText();

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '12px',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Row 1: Top Section */}
      <div
        style={{
          flex: '0 0 20%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap', // Responsive
        }}
      >
        {roleID === 2 ? ( // 2 stands for Supervisor
          <>
            {/* On Leave Button */}
            <Button
              loading={onLeaveLoad}
              type="default"
              size="large"
              style={{
                fontSize: 'clamp(16px, 2vw, 20px)',
                color: '#faad14',
                borderColor: '#faad14',
                width: 'clamp(150px, 40%, 200px)',
                height: 'clamp(100px, 150px, 200px)',
                backgroundColor: hoverOnLeave ? '#fffbe6' : 'white',
              }}
              onMouseEnter={() => setHoverOnLeave(true)}
              onMouseLeave={() => setHoverOnLeave(false)}
              onClick={() => {
                setOnLeaveLoad(true); 
                handleClick('onLeave');
                setStatus('onLeave'); // for icon 
              }}
            >
              On Leave
            </Button>

            {/* Absent Button */}
            <Button
              loading={onAbsentLoad}
              type="default"
              danger
              size="large"
              style={{
                fontSize: 'clamp(16px, 2vw, 20px)',
                width: 'clamp(150px, 40%, 200px)',
                height: 'clamp(100px, 150px, 200px)',
                backgroundColor: hoverAbsent ? '#fff1f0' : 'white', // Light red background
                borderColor: hoverAbsent ? '#ff4d4f' : '#ff4d4f',
                color: hoverAbsent ? '#a8071a' : '#ff4d4f',
              }}
              onMouseEnter={() => setHoverAbsent(true)}
              onMouseLeave={() => setHoverAbsent(false)}
              onClick={() => {
                setOnAbsentLoad(true);
                handleClick('absent');
                setStatus('absent');
              }}
            >
              Absent
            </Button>
          </>
        ) : (
          <div style={{ width: '100%' }}>
            <Header
              style={{
                backgroundColor: '#1890ff',
                borderRadius: '12px',
                width: '100%',
                position: 'relative',
              }}
            >
              <Text
                style={{
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  color: '#fff',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                STATUS
              </Text>
            </Header>
          </div>
        )}
      </div>

      {/* Row 2: Status Overview */}
      <div
        style={{
          flex: '0 0 80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          marginTop: '16px',
          flexDirection: 'column',
          padding: '1rem',
        }}
      >
        <Space direction="vertical" align="center">
          {icon}
          <Text
            strong
            style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              color: '#999',
              textAlign: 'center',
              wordWrap: 'break-word',
            }}
          >
            {text}
          </Text>
        </Space>
      </div>

    </div>
  );
};

export default AttendanceControl;
