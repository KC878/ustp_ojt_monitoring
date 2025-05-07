
import React from 'react';
import { Progress, Typography } from 'antd'; // Assuming you are using Ant Design
import { Logs } from '@src/utils/interfaces';
import { toManilaYYMMDD } from '@src/utils/toManilaYYMMDD';

const { Title, Text } = Typography;

interface Props {
  logs: Logs[];
}
const CardLogs:  React.FC<Props> =  ({ logs }) => {

  return (
    <div
      style={{
        width: '100%', // allow it to be responsive
        minWidth: '250px', // fallback for small screens
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        overflow: 'hidden',
        fontSize: '14px',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        flex: 1, // allow flexibility in grid/flex layouts
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
    >

      {/* Header Row */}
      <div
        style={{
          display: 'flex',
          fontWeight: 'bold',
          padding: '10px 16px',
          backgroundColor: 'white',
          borderBottom: '1px solid #d9d9d9',
          paddingRight: '30px', // for scrollbar alignment
          boxSizing: 'border-box',
        }}
      >
        <Text style={{ flex: 1, textAlign: 'left' }}>Date</Text>
        <Text style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>Time In</Text>
        <Text style={{ flex: 1, textAlign: 'center' }}>Time Out</Text>
        <Text style={{ flex: 1, textAlign: 'right' }}>Duration</Text>
      </div>

  
      {/* Data Rows */}
        <div
          style={{
            maxHeight: 'calc(100vh - 320px)', // adjust to fit your layout
            overflowY: 'auto',
            paddingRight: '8px',
            boxSizing: 'border-box',
          }}
        >

        {logs.map((log, index) => {
          const isLastItem = index === logs.length - 1;

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
              {/* now create */}
              <Text style={{ flex: 1 }}>{toManilaYYMMDD(log.createdAt)}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{log.timeIn || '-'}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{log.timeOut || '-'}</Text>
              <Text style={{ flex: 1, textAlign: 'right' }}>
                  {log.renderedTime}
                </Text>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '10px 16px',
          backgroundColor: 'white',
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
