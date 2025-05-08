export interface Logs {
  email: string;
  createdAt: string;
  timeIn: string;
  timeOut: string;
  renderedTime: string;
  attendanceStatus: string;
}

export interface AttendanceRecord {
  name: string;       // e.g., 'Mon', 'Tue', etc.
  absences: number;
  leave: number;
  present: number;
}

export interface LeaveAbsentIfo {
  email: string;
  userID: string;
  attendanceStatus: string;
}