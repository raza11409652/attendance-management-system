import { Request } from "express";
import { Types } from "mongoose";
export type UserRole = "MANAGER" | "EMPLOYEE";
export const Days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;
export type Day = (typeof Days)[number];

export interface User {
  name: string;
  password: string;
  email: string;
  role?: UserRole;
  accountId?: string;
  roster?: string;
}

export interface AuthLogin {
  email: string;
  password: string;
}

export interface SessionPayload {
  id: string;
  email: string;
  accountId: string;
  type: "SESSION" | "REFRESH";
  role: UserRole;
}

export interface AppRequest extends Request {
  payload?: SessionPayload | { [key: string]: any };
}

export interface RosterTimeTable {
  day: string;
  startTime: string;
  endTime: string;
}

export interface RosterBody {
  title: string;
  shift: RosterTimeTable[];
}

export interface CheckInAttendance {
  accountId: string;
  user: Types.ObjectId;
  checkInTimestamp: Date;
  date: string;
  roster: Types.ObjectId;
  checkInDelay: number;
  image:string;
  latitude:number;
  longitude:number
}
