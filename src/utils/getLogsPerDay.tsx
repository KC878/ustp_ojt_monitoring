// getLogsPerDay.ts

import { Logs, AttendanceRecord } from "./interfaces";

export const getLogsPerDay = ({
  logs,
  userEmail,
}: {
  logs: Logs[];
  userEmail: string;
}): AttendanceRecord[] => {
  const dayMap: Record<number, { full: string; short: string }> = {
    1: { full: "Monday", short: "Mon" },
    2: { full: "Tuesday", short: "Tue" },
    3: { full: "Wednesday", short: "Wed" },
    4: { full: "Thursday", short: "Thu" },
    5: { full: "Friday", short: "Fri" },
    6: { full: "Saturday", short: "Sat" },
  };

  const dayStats: Record<
    string,
    Omit<AttendanceRecord, "name">
  > = {
    Monday: { absences: 0, leave: 0, present: 0 },
    Tuesday: { absences: 0, leave: 0, present: 0 },
    Wednesday: { absences: 0, leave: 0, present: 0 },
    Thursday: { absences: 0, leave: 0, present: 0 },
    Friday: { absences: 0, leave: 0, present: 0 },
    Saturday: { absences: 0, leave: 0, present: 0 },
  };

  logs.forEach((log) => {
    if (log.email === userEmail) {
      const logDate = new Date(log.createdAt);
      const day = logDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

      if (day >= 1 && day <= 6) {
        const dayName = dayMap[day].full;
        const status = log.attendanceStatus.toLowerCase();

        if (status === 'present') {
          dayStats[dayName].present++;
        } else if (status === "onleave") { // since toLowerCase method 
          dayStats[dayName].leave++;
        } else if (status === "absent") {
          dayStats[dayName].absences++;
        }
      }
    }
  });

  const result: AttendanceRecord[] = Object.entries(dayStats).map(
    ([dayFullName, stats]) => {
      const shortName =
        Object.values(dayMap).find((d) => d.full === dayFullName)?.short ?? "";
      return {
        name: shortName,
        ...stats,
      };
    }
  );

  return result;
};
