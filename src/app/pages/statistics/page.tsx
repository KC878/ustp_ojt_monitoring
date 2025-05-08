import React, { useState, useEffect } from 'react';
import Loading from '@src/components/Loading';
import CardUser from '@src/components/CardUser';
import CardProgress from '@src/components/CardProgress';
import CardLogs from '@src/components/CardLogs';
import CardGraph from '@src/components/CardGraph';
import { useLoading } from '@src/store/useLoading';
import { postData } from '@src/services/usePostData';
import { getLogs } from '@src/utils/getLogs';
import { getPresentLogs } from '@src/utils/getPresentLogs';
import { getLogsPerDay } from '@src/utils/getLogsPerDay';
import { timeRendredTotal } from '@src/utils/timeRenderedTotal';
import AttendanceControl from '@src/components/AttendanceControl';
import { LeaveAbsentIfo} from '@src/utils/interfaces';
import { useFetchData } from '@src/services/useFetchData';


const StatisticsPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const { loading } = useLoading();


  // Fetch Users and Logs data using the custom hook
  const { data: Users, error: usersError, loading: statLoading } = useFetchData<any>(`/api/tasks/GET/getStatistics?reload=${reload}`);
  const { data: Logs, error: logsError, loading: logLoading } = useFetchData<any>(`/api/tasks/GET/getStatLogs?reload=${reload}`);

  

  // Combine loading states (either statLoading or logLoading triggers global loading)
  
  const uiLoading = statLoading || logLoading;

  const handleLeaveAbsent = async ({ email, userID, attendanceStatus }: LeaveAbsentIfo) => {
    await postData(
      '/api/tasks/POST/postLeaveAbsent',
      ['email', 'userID', 'attendanceStatus'], // columns
      [email, userID, attendanceStatus]  // values
    );

    setTimeout(() => {
      // mimic 3 seconds loading
      setReload(prevState => !prevState); // Toggle reload to trigger refetch
    }, 3000);
  };

  // If data is loading, show the loading spinner
  if (uiLoading ) {
    return <Loading />;
  }

  // Check if there are any errors
  if (usersError || logsError) {
    return <div>Error fetching data: {usersError || logsError}</div>;
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
        {Users.map((user) => {
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
                  <AttendanceControl
                    email={user.email}
                    userID={user.userID}
                    handleLeaveAbsent={handleLeaveAbsent}
                    dataLogs={getPresentLogs({ logs: Logs, userEmail: user.email })} // filteredOnly Show Logs present today
                  />
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
