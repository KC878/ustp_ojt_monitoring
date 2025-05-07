'use client';

import React, { useEffect } from 'react';
import Loading from '@src/components/Loading';
import CardUser from '@src/components/CardUser';
import CardProgress from '@src/components/CardProgress';
import CardLogs from '@src/components/CardLogs';
import CardGraph from '@src/components/CardGraph';
import { useLoading } from '@src/store/useLoading';
import { useFetchData } from '@src/services/useFetchData';
import { getLogs } from '@src/utils/getLogs';
import { getLogsPerDay } from '@src/utils/getLogsPerDay';
import { timeRendredTotal } from '@src/utils/timeRenderedTotal';
import AttendanceControl from '@src/components/AttendanceControl';



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

          if(user.roleID === 1) {
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
                        dataLogs={getLogs({ logs: Logs, userEmail: user.email })}
                      />
                    </div>
                    
                    <div>
                    <CardLogs logs={
                      getLogs({ logs: Logs, userEmail: user.email })
                    }/>

                    </div>

                    <div
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '16px',
                        border: '1px solid #ddd',
                        height: '100%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      }}
                    >
                      {/* Graph Component */}
                      <CardGraph userChartData={getLogsPerDay({ logs: Logs, userEmail: user.email })}/>
                    </div>

                    <div>
                      <CardProgress timeAccumulated={
                        timeRendredTotal({ logs: Logs, userEmail: user.email})
                      }duration={user.duration}/>
                    </div>
                  </div>
                </div>

                {/* DIVIDER */}
                {/* <div
                  style={{
                    width: '1px',
                    backgroundColor: '#ddd',
                    margin: '0 8px',
                    minHeight: '100%',
                  }}
                /> */}

                {/* RIGHT SIDE */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '300px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <AttendanceControl email={user.email}/>
                </div>
              </div>
            );
          }
          
        })}
      </div>
    </div>
  );
};

export default StatisticsPage;
