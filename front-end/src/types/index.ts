export interface LoginBody {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: Token;
  user: User;
}
export interface User {
  id: string;
  email: string;
  accountId: string;
  type: string;
  role: UserRole;
  name: string;
  avatar: string;
  profile?: string | null;
}

export type UserRole = "MANAGER" | "EMPLOYEE";
export interface Token {
  refresh: string;
  session: string;
}

export interface CheckInAttendanceBody {
  latitude: number;
  longitude: number;
}
export interface GeoLocation {
  lat: number;
  long: number;
}
export interface AttendanceLog {
  _id: string;
  user: string;
  roster: string;
  date: string;
  checkInTimestamp: string;
  checkOutTimestamp?: string | null;
  accountId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface GetAttendanceLogs {
  totalCount: number;
  records: AttendanceLog[];
  totalPages: number;
  currentPage: number;
}

export interface FetchAttendance {
  page: number;
  user?: string;
}

export interface GetEmployeeApiResponse {
  totalCount: number;
  records: Employee[];
  totalPages: number;
  currentPage: number;
}

export interface Employee {
  _id: string;
  name: string;
  email: string;
  mobileNumber?: string;
  avatarBackground: string;
  profileImage: string | null;
  role: UserRole;
  accountId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  roster?: Roster;
}

export interface Roster {
  _id: string;
  title: string;
  timeTable: TimeTable[];
  accountId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TimeTable {
  day: string;
  endTime: string;
  startTime: string;
}

// export type Root = Root2[];

export interface Roster {
  _id: string;
  title: string;
  timeTable: TimeTable[];
  accountId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TimeTable {
  day: string;
  endTime: string;
  startTime: string;
}
export interface CreateEmployee {
  name: string;
  password: string;
  email: string;
  roster: string;
}

export interface NewRosterBody {
  title: string;
  shift: Shift[];
}

export interface Shift {
  day: Day;
  endTime: string;
  startTime: string;
}

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
