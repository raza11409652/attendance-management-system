import mongoose from "mongoose";
import { RosterTimeTable } from "../types";

const rosterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    timeTable: {
      type: Array<RosterTimeTable>,
      default: [],
    },
    accountId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "rosters" }
);
rosterSchema.index({ _id: 1, accountId: 1 });
export default mongoose.model("rosters", rosterSchema);
