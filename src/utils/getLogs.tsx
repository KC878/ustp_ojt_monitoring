import { Logs } from "./interfaces";
// utils.ts
export const getLogs = ({ logs, userEmail }: { logs: Logs[], userEmail: string }) => {
  const filteredLogs: Logs[] = [];

  logs.map(log => {
    if (log.email === userEmail) {
      filteredLogs.push(log);

    }
  });
  console.log(filteredLogs)

  return filteredLogs;
};
// return logs only by specific email

