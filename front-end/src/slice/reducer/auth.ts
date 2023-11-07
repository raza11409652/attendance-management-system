import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginBody, LoginResponse, User, UserRole } from "../../types";
import { loginApi } from "../../apis/auth";
import {
  deleteAllFromLocal,
  getItemFromLocal,
  setItemInLocal,
} from "../../utils/local-storage";
interface Props {
  loading: true | false;
  auth: true | false;
  role?: UserRole;
  user?: User;
}
const initialState: Props = {
  loading: false,
  auth: getItemFromLocal("auth-state"),
  role: getItemFromLocal("auth-user-role"),
  user: getItemFromLocal("auth-user-profile"),
};
export const LoginAction = createAsyncThunk<LoginResponse, LoginBody>(
  "login-action",
  async (body, { rejectWithValue }) => {
    try {
      const a = await loginApi(body);
      return a;
    } catch (e) {
      return rejectWithValue("Error");
    }
  }
);
const authState = createSlice({
  name: "auth-slice",
  initialState: initialState,
  reducers: {
    logoutAction: (a) => {
      a.auth = false;
      deleteAllFromLocal();
    },
  },
  extraReducers: (b) => {
    b.addCase(LoginAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(LoginAction.rejected, (s) => {
      s.loading = false;
    });
    b.addCase(LoginAction.fulfilled, (s, { payload }) => {
      s.loading = false;
      s.auth = true;
      s.role = payload.user.role;
      s.user = payload.user;
      //   console.log(payload);
      setItemInLocal("auth-state", true);
      setItemInLocal("session-token", payload.token.session);
      setItemInLocal("refresh-token", payload.token.session);
      setItemInLocal("auth-user-role", payload.user.role);
      setItemInLocal("auth-user-profile", payload.user);
    });
  },
});
export const { logoutAction } = authState.actions;
export default authState.reducer;
