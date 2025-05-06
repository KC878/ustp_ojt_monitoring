'use client';

import InitialSteps from '@src/components/InitialSteps';
import { useFetchData } from '@src/services/useFetchData';
import { getLogs } from '@src/utils/getLogs';

const Page = () => {
  const { data: logs } = useFetchData<any>('/api/tasks/GET/getStatLogs');

  if (!logs) return <p>Loading...</p>; // Show loading until logs are available

  const filteredLogs = getLogs({ logs, userEmail: 'hannah19@gmail.com' });

  return (
    <div>
      <h1>Filtered Logs</h1>
      {filteredLogs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <ul>
          {filteredLogs.map((log, index) => (
            <li key={index}>
              <p><strong>Email:</strong> {log.email}</p>
              <p><strong>Date:</strong> {log.createdAt.slice(0, 10)}</p>
              <p><strong>Time In:</strong> {log.timeIn}</p>
              <p><strong>Time Out:</strong> {log.timeOut}</p>
              <p><strong>Rendered Time:</strong> {log.renderedTime}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
