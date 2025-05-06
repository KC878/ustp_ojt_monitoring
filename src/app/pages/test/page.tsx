'use client';

import InitialSteps from '@src/components/InitialSteps';
import { useFetchData } from '@src/services/useFetchData';
import { getLogs } from '@src/utils/getLogs';
import { timeRendredTotal } from '@src/utils/timeRenderedTotal';

const Page = () => {
  const { data: logs } = useFetchData<any>('/api/tasks/GET/getStatLogs');

  if (!logs) return <p>Loading...</p>; // Show loading until logs are available

  const total = timeRendredTotal({ logs, userEmail: 'hannah19@gmail.com' });

  return (
    <h1> {total} </h1>
  );
};

export default Page;
