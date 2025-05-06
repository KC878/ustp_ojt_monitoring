'use client';

import InitialSteps from '@src/components/InitialSteps';
import { useFetchData } from '@src/services/useFetchData';
import { getLogs } from '@src/utils/getLogs';
import PDFLogs from '@src/components/PDFLogs';

const Page = () => {
  const { data: logs } = useFetchData<any>('/api/tasks/GET/getStatLogs');

  if (!logs) return <p>Loading...</p>; // Show loading until logs are available

  const filteredLogs = getLogs({ logs, userEmail: 'hannah19@gmail.com' });

  return (
    <PDFLogs logs={filteredLogs} name={'Kent Christian'}/>
  );
};

export default Page;
