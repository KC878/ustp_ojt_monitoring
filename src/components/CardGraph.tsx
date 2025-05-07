

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AttendanceRecord } from '@src/utils/interfaces';

// Main dummyData object
interface Props {
  userChartData: AttendanceRecord[];
}

const CardGraph:  React.FC<Props> =  ({ userChartData }) => {

  return(
    <>
      {userChartData.length ? (
        <ResponsiveContainer width="100%" height={250} style={{backgroundColor: 'white'}}>
          <BarChart data={userChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#52c41a" />     {/* green */}
            <Bar dataKey="leave" fill="#ffa500" />      {/* orange */}
            <Bar dataKey="absences" fill="#ff4d4f" />   {/* red */}
            

          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ padding: '12px', textAlign: 'center' }}>
          <p>No chart data available</p>
        </div>
      )}
    </>
    
  );

}


export default CardGraph;
