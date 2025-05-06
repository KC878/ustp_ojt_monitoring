'use client';

import React, { useState, useEffect } from 'react';
import Loading from '@src/components/Loading';
import CardUser from '@src/components/CardUser';
import CardProgress from '@src/components/CardProgress';
import CardLogs from '@src/components/CardLogs';

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

import { Button } from 'antd';
import { useLoading } from '@src/store/useLoading';
import { useFetchData } from '@src/services/useFetchData';
import { getLogs } from '@src/utils/getLogs';

const dummyData = {
  1: [
    { name: 'Mon', absences: 4, leave: 2, present: 8 },
    { name: 'Tue', absences: 5, leave: 1, present: 7 },
    { name: 'Wed', absences: 3, leave: 2, present: 9 },
    { name: 'Thu', absences: 6, leave: 1, present: 6 },
    { name: 'Fri', absences: 2, leave: 4, present: 10 },
  ],
  2: [
    { name: 'Mon', absences: 2, leave: 1, present: 10 },
    { name: 'Tue', absences: 3, leave: 2, present: 8 },
    { name: 'Wed', absences: 4, leave: 1, present: 7 },
    { name: 'Thu', absences: 5, leave: 3, present: 6 },
    { name: 'Fri', absences: 1, leave: 2, present: 11 },
  ],
  3: [
    { name: 'Mon', absences: 6, leave: 1, present: 7 },
    { name: 'Tue', absences: 4, leave: 2, present: 9 },
    { name: 'Wed', absences: 3, leave: 3, present: 6 },
    { name: 'Thu', absences: 2, leave: 2, present: 9 },
    { name: 'Fri', absences: 5, leave: 1, present: 8 },
  ],
};

const DummyComponent = () => (
  <div
    style={{
      backgroundColor: '#f0f0f0',
      padding: '16px',
      borderRadius: '8px',
      height: '100%',
      width: '100%',
    }}
  >
    <h3>Dummy Component</h3>
    <p>This is a placeholder for any additional content.</p>
  </div>
);

const StatisticsPage: React.FC = () => {
  const { loading, setLoading } = useLoading();
  const { data: Users } = useFetchData<any>('/api/tasks/GET/getStatistics');
  const { data: Logs } = useFetchData<any>('/api/tasks/GET/getStatLogs');

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);




  return loading ? (
    <Loading />
  ) : (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        padding: '40px 24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Users.map((user, index) => {// define later
          const userChartData = dummyData[1] || [];
          // alert(user.email);
          return (
            <div
              key={user.userID}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                border: '1px solid #ccc',
                borderRadius: '12px',
                padding: '24px',
                backgroundColor: 'white',
                flexWrap: 'wrap',
              }}
            >
              {/* LEFT SIDE */}
              <div
                style={{
                  flex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  minWidth: '300px',
                }}
              >
                {/* Card + Chart Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '16px',
                    width: '100%',
                    alignItems: 'stretch',
                  }}
                >
                  <div>
                    <CardUser
                      name={user.name}
                      schoolID={user.schoolID}
                    />
                  </div>
                  
                  <div>
                  <CardLogs logs={
                    getLogs({ logs: Logs, userEmail: user.email })
                  }/>

                  </div>

                  <div
                    style={{
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      padding: '16px',
                      border: '1px solid #ddd',
                      height: '100%',
                    }}
                  >
                    {userChartData.length ? (
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={userChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="absences" fill="#8884d8" />
                          <Bar dataKey="leave" fill="#82ca9d" />
                          <Bar dataKey="present" fill="#ffc658" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div style={{ padding: '12px', textAlign: 'center' }}>
                        <p>No chart data available</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <CardProgress />
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <Button>Select Date</Button>
                </div>
              </div>

              {/* DIVIDER */}
              <div
                style={{
                  width: '1px',
                  backgroundColor: '#ddd',
                  margin: '0 8px',
                  minHeight: '100%',
                }}
              />

              {/* RIGHT SIDE */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minWidth: '300px',
                }}
              >
                <DummyComponent />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatisticsPage;
