'use client';

import React, { useState, useEffect } from 'react';
import Loading from '@src/components/Loading';
import CardUser from '@src/components/CardUser';
import CardProgress from '@src/components/CardProgress';
import CardLogs from '@src/components/CardLogs';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from 'antd';
import { useLoading } from '@src/store/useLoading';

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
      boxSizing: 'border-box',
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
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', padding: '40px 24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '24px',
              backgroundColor: 'white',
            }}
          >
            {/* LEFT SIDE */}
            <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Card Row */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between', // Ensures cards are spaced properly
                }}
              >
                <div style={{ flex: '1 1 32%', minWidth: '250px', marginBottom: '16px' }}>
                  <CardUser />
                </div>

                <div style={{ flex: '1 1 32%', minWidth: '250px', marginBottom: '16px' }}>
                  <CardLogs />
                </div>

                <div style={{ flex: '1 1 32%', minWidth: '250px', marginBottom: '16px' }}>
                  <CardProgress />
                </div>
              </div>

              {/* Statistics Graph */}
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid #ddd',
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dummyData[user.id]}>
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
              </div>
              <Button> Select Date </Button>
            </div>

            {/* DIVIDER */}
            <div
              style={{
                width: '1px',
                backgroundColor: '#ddd',
                margin: '0 8px',
              }}
            />

            {/* RIGHT SIDE */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DummyComponent />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsPage;
