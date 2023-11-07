import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Employee, GetEmployeeApiResponse } from "../../types";
import { getEmployeeListApi } from "../../apis/employee";
interface Props {
  loader: true | false;
  currentPage: number;
  totalCount: number;
  totalPages: number;
  records: Employee[];
}
const initialState: Props = {
  loader: false,
  currentPage: 0,
  totalCount: 0,
  totalPages: 0,
  records: [],
};
export const GetEmployeeListAction = createAsyncThunk<
  GetEmployeeApiResponse,
  number
>("emp-list", async (page, { rejectWithValue }) => {
  // const response = await
  try {
    const response = await getEmployeeListApi(page);
    return response;
  } catch (e) {
    return rejectWithValue("Api error");
  }
});
const employeeSlice = createSlice({
  name: "emp-slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(GetEmployeeListAction.pending, (a) => {
      a.loader = true;
    });
    b.addCase(GetEmployeeListAction.rejected, (a) => {
      a.loader = false;
    });
    b.addCase(GetEmployeeListAction.fulfilled, (a, { payload }) => {
      a.loader = false;
      a.currentPage = payload.currentPage;
      a.totalCount = payload.totalCount;
      a.totalPages = payload.totalPages;
      a.records = payload.records;
    });
  },
});

export default employeeSlice.reducer;
