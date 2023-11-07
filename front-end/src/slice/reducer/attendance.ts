import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkOutAttendanceApi,
  getAttendanceLogsApi,
  getCheckInStatusApi,
} from "../../apis/attendance";
import { AttendanceLog, FetchAttendance, GetAttendanceLogs } from "../../types";
interface Props {
  loading: true | false;
  todaysAttendance?: AttendanceLog;
  logs: AttendanceLog[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}
const initialState: Props = {
  loading: false,
  logs: [],
  currentPage: 0,
  totalPages: 0,
  totalCount: 0,
  // todaysAttendance:
};
export const GetTodayCheckInStatusAction = createAsyncThunk<
  AttendanceLog,
  void
>("get-today-check-in", async (_, { rejectWithValue }) => {
  try {
    const response = await getCheckInStatusApi();
    // console.log(response.checkOutTimestamp);
    return response;
  } catch (e) {
    return rejectWithValue("Api error");
  }
});
export const AttendanceCheckOutAction = createAsyncThunk<object, void>(
  "checkout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkOutAttendanceApi();
      return response;
    } catch (e) {
      return rejectWithValue("Api error");
    }
  }
);
export const GetAttendanceLogsAction = createAsyncThunk<
  GetAttendanceLogs,
  FetchAttendance
>("logs", async (q, { rejectWithValue }) => {
  try {
    const response = getAttendanceLogsApi(q);
    return response;
  } catch (e) {
    return rejectWithValue("Api error");
  }
});
const attendanceSlice = createSlice({
  name: "attendanceSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(GetTodayCheckInStatusAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(GetTodayCheckInStatusAction.rejected, (a) => {
      a.loading = false;
    });
    b.addCase(GetTodayCheckInStatusAction.fulfilled, (a, { payload }) => {
      a.loading = false;
      // console.log(payload);
      a.todaysAttendance = payload;
    });

    b.addCase(GetAttendanceLogsAction.pending, (a) => {
      a.loading = true;
    });
    b.addCase(GetAttendanceLogsAction.rejected, (a) => {
      a.loading = false;
    });
    b.addCase(GetAttendanceLogsAction.fulfilled, (a, { payload }) => {
      a.loading = false;
      a.logs = payload.records;
      a.currentPage = payload.currentPage;
      a.totalPages = payload.totalPages;
      a.totalCount = payload.totalCount;
    });

    b.addCase(AttendanceCheckOutAction.pending, (a) => {
      a.loading = true;
    });
    b.addCase(AttendanceCheckOutAction.rejected, (a) => {
      a.loading = false;
    });
    b.addCase(AttendanceCheckOutAction.fulfilled, (a) => {
      a.loading = false;
    });
  },
});
export default attendanceSlice.reducer;
