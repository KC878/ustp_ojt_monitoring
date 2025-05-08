import React, { useEffect, useState } from 'react';
import Loading from '@src/components/Loading';
import CardUser from '@src/components/CardUser';
import CardProgress from '@src/components/CardProgress';
import CardLogs from '@src/components/CardLogs';
import CardGraph from '@src/components/CardGraph';
import { useLoading } from '@src/store/useLoading';
import { postData } from '@src/services/usePostData';
import { getLogs } from '@src/utils/getLogs';
import { getLogsPerDay } from '@src/utils/getLogsPerDay';
import { timeRendredTotal } from '@src/utils/timeRenderedTotal';
import AttendanceControl from '@src/components/AttendanceControl';
import { LeaveAbsentIfo } from '@src/utils/interfaces';

const StatisticsPage: React.FC = () => {
  const { loading, setLoading } = useLoading();
  
  const [Users, setUsers] = useState<any[]>([]);
  const [Logs, setLogs] = useState<any[]>([]);
  const [statLoading, setStatLoading] = useState(true);
  const [logLoading, setLogLoading] = useState(true);

  // Refetch the data
  const refetchData = async () => {
    setStatLoading(true);
    setLogLoading(true);

    try {
      const userResponse = await fetch('/api/tasks/GET/getStatistics');
      const userData = await userResponse.json();
      setUsers(userData);

      const logResponse = await fetch('/api/tasks/GET/getStatLogs');
      const logData = await logResponse.json();
      setLogs(logData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setStatLoading(false);
      setLogLoading(false);
    }
  };

  const handleLeaveAbsent = async ({ email, userID, attendanceStatus }: LeaveAbsentIfo) => {
    await postData(
      '/api/tasks/POST/postLeaveAbsent',
      ['email', 'userID', 'attendanceStatus'], // columns
      [email, userID, attendanceStatus]  // values
    );
    
    setTimeout(() => {
      setLoading(false); // mimic 3 seconds loading
      refetchData(); // Refetch the data after the action is completed
    }, 3000);
  };

  useEffect(() => {
    // Fetch Users data
    const fetchUsers = async () => {
      setStatLoading(true);
      try {
        const response = await fetch('/api/tasks/GET/getStatistics');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setStatLoading(false);
      }
    };

    // Fetch Logs data
    const fetchLogs = async () => {
      setLogLoading(true);
      try {
        const response = await fetch('/api/tasks/GET/getStatLogs');
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLogLoading(false);
      }
    };

    fetchUsers();
    fetchLogs();
  }, []); 

  if (statLoading || logLoading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        padding: '40px 24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Users.map((user, index) => {
          if (user.roleID === 1) {
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
                      <CardLogs logs={getLogs({ logs: Logs, userEmail: user.email })} />
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
                      <CardGraph userChartData={getLogsPerDay({ logs: Logs, userEmail: user.email })} />
                    </div>

                    <div>
                      <CardProgress
                        timeAccumulated={timeRendredTotal({ logs: Logs, userEmail: user.email })}
                        duration={user.duration}
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '300px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* <AttendanceControl
                    email={user.email}
                    userID={user.userID}
                    handleLeaveAbsent={handleLeaveAbsent}
                  /> */}
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
