import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./reducer/auth";
import attendanceReducer from "./reducer/attendance";
import employeeReducer from "./reducer/employee";
import rosterReducer from "./reducer/roster";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    employee: employeeReducer,
    roster: rosterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
