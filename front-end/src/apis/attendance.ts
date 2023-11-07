import { AttendanceLog, FetchAttendance, GetAttendanceLogs } from "../types";
import axios from "./axios";

export const checkInAttendanceApi = async (b: object) => {
  const { data } = await axios.post("attendances", b);
  return data;
};
export const checkOutAttendanceApi = async () => {
  const { data } = await axios.post<object>("attendances/checkout", {});
  return data;
};
export const getCheckInStatusApi = async () => {
  const { data } = await axios.get<AttendanceLog>(
    "attendances/check-in/status"
  );
  return data;
};
export const getAttendanceLogsApi = async (p: FetchAttendance) => {
  const { data } = await axios.get<GetAttendanceLogs>("attendances", {
    params: { page: p.page, user: p.user },
  });
  return data;
};
