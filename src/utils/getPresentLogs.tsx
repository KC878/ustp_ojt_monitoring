import { Logs, PresentLog } from "./interfaces";
import { ymdFormattedDate } from "./date";
import { toManilaYYMMDD } from "./toManilaYYMMDD";
// utils.ts
export const getPresentLogs = ({ logs, userEmail }: { logs: Logs[], userEmail: string }) => {
  const filteredLogs: PresentLog[] = [];


  logs.map(log => {
    if (log.email === userEmail && toManilaYYMMDD(log.createdAt) === ymdFormattedDate) {
      filteredLogs.push(
        {
          email: log.email,
          createdAt: toManilaYYMMDD(log.createdAt),
          attendanceStatus: log.attendanceStatus
        }
      );
     
    }
  });

  // console.log('<><><><><><><><', filteredLogs);
 
  return filteredLogs;
};
// return logs only by specific email

