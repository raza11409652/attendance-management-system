import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Roster } from "../../types";
import { getRostersApi } from "../../apis/roster";
interface ViewRoster {
  roster: Roster;
  mode: string;
}
interface Props {
  loader: true | false;
  rosters: Roster[];
  singleRoster?: ViewRoster;
}
const initialState: Props = { loader: false, rosters: [] };
export const GetRostersAction = createAsyncThunk<Roster[], void>(
  "get-rosters",
  async (_, { rejectWithValue }) => {
    try {
      const response = getRostersApi();
      return response;
    } catch (e) {
      return rejectWithValue("Api error");
    }
  }
);
interface SingleRosterView {
  type: string;
  payload: ViewRoster;
}
const rosterSlice = createSlice({
  name: "roster-slice",
  initialState: initialState,
  reducers: {
    singleRosterViewAction: (s, payload: SingleRosterView) => {
      // console.log(payload.payload);
      s.singleRoster = payload.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(GetRostersAction.pending, (s) => {
      s.loader = true;
    });
    b.addCase(GetRostersAction.fulfilled, (s, { payload }) => {
      s.loader = false;
      s.rosters = payload;
    });

    b.addCase(GetRostersAction.rejected, (s) => {
      s.loader = false;
    });
  },
});

export const { singleRosterViewAction } = rosterSlice.actions;
export default rosterSlice.reducer;
