'use client';

import React, { useState, useEffect } from 'react';
import CardSkeleton from '@src/components/CardSkeloton';
import CardUser from '@src/components/CardUser';

const StatisticsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {
    setLoading(true);

    // Simulate fetching user data
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
    <div style={{ minHeight: '100vh', backgroundColor: 'white', padding: '40px 24px' }}>
      <CardSkeleton />
    </div>
  ) : (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', padding: '40px 24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: '1px solid #ccc',
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* User Info Section */}
            <div style={{ flex: 1 }}>
              <CardUser />
            </div>

            {/* Statistics Graph Section */}
            <div
              style={{
                width: '200px',
                height: '150px',
                backgroundColor: '#f2f2f2',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                border: '1px solid #ddd',
              }}
            >
              {/* Simple placeholder for graph */}
              <div
                style={{
                  width: '100%',
                  height: '50%',
                  backgroundColor: '#e0e0e0',
                  marginBottom: '8px',
                }}
              >
                {/* Placeholder for X and Y axis */}
              </div>
              <div style={{ width: '100%', height: '50%', backgroundColor: '#d1d1d1' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsPage;
