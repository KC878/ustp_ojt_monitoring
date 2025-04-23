import { RowDataPacket } from "mysql2";

export interface UserFetch extends RowDataPacket {
  userID: string;
  name: string;
  email: string;
  passwored: string;
  roleID: number;
}

export interface DailyLogs extends RowDataPacket {
  email: string;
  userID: string;
  createdAt: string;
}

export interface DailyDuty extends RowDataPacket {
  userID: string;
  dateIn: string;
  timeIn: string;
  timeOut: string;
  duty: string;
}

export interface InsertDailyLogs extends RowDataPacket {
  email: string;
  userID: string;
  createdAt: string;
  timeIn: string;
  timeOut: string;
}

