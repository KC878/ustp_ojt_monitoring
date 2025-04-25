
import React from 'react';
import { Progress, Typography } from 'antd'; // Assuming you are using Ant Design


const { Title, Text } = Typography;

const CardLogs =  () => {

  const logsData = [
    { date: '2025-04-01', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
    { date: '2025-04-02', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
    { date: '2025-04-03', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
    { date: '2025-04-04', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
    { date: '2025-04-03', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
    { date: '2025-04-04', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
    { date: '2025-04-03', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
    { date: '2025-04-04', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
    { date: '2025-04-03', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
    { date: '2025-04-04', timeIn: '09:05 AM', timeOut: '10:00 AM', status: '8 Hrs' },
  ];


  return (
    <div
      style={{
        width: '370px',
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        overflow: 'hidden',
        fontSize: '14px',
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: 'flex',
          fontWeight: 'bold',
          padding: '10px 16px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #d9d9d9',
          paddingRight: '30px', // for scrollbar alignment
          boxSizing: 'border-box',
        }}
      >
        <Text style={{ flex: 1, textAlign: 'left' }}>Date</Text>
        <Text style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>Time In</Text>
        <Text style={{ flex: 1, textAlign: 'center' }}>Time Out</Text>
        <Text style={{ flex: 1, textAlign: 'right' }}>Hours</Text>
      </div>

      {/* Data Rows */}
      <div
        style={{
          maxHeight: '340px',
          overflowY: 'auto',
        }}
      >
        {logsData.map((log, index) => {
          const isLastItem = index === logsData.length - 1;

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                padding: '10px 16px',
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: '#fff',
                boxSizing: 'border-box',
              }}
            >
              <Text style={{ flex: 1 }}>{log.date}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{log.timeIn || '-'}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{log.timeOut || '-'}</Text>
              <Text style={{ flex: 1, textAlign: 'right' }}>
                  {log.renderedHours || log.status || '-'}
                </Text>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '10px 16px',
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #d9d9d9',
          display: 'flex',
          flexDirection: 'column', // Ensure elements stack vertically
        }}
      >
      </div>
    </div>
  );
};

export default CardLogs;
