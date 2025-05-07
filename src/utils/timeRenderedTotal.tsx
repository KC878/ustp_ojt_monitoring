import { Logs } from "./interfaces";

function timeStringToSeconds(time: string): number {
  if (!time) return 0; // Handle null, undefined, or empty string
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function secondsToTimeString(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export const timeRendredTotal = ({ logs, userEmail }: { logs: Logs[], userEmail: string }) => {
  const filteredLogs: Logs[] = [];
  let totalSeconds = 0;

  logs.forEach(log => {
    if (log.email === userEmail && log.renderedTime) { // Check if renderedTime is not null or empty
      filteredLogs.push(log);
      totalSeconds += timeStringToSeconds(log.renderedTime);
    }
  });

  const totalRenderedTime = secondsToTimeString(totalSeconds);

  return totalRenderedTime;
};
