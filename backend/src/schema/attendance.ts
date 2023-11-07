import mongoose, { Types } from "mongoose";
const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
    },
    roster: {
      type: Types.ObjectId,
      required: true,
      ref: "rosters",
    },
    date: {
      type: String,
      required: true,
    },
    checkInTimestamp: {
      type: Date,
      required: true,
    },
    checkOutTimestamp: {
      type: Date,
      default: null,
    },
    accountId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: "attendances", autoIndex: true }
);
attendanceSchema.index({ accountId: 1, user: 1 });
attendanceSchema.index({ date: 1, user: 1 }, { unique: true });
//
export default mongoose.model("attendances", attendanceSchema);
