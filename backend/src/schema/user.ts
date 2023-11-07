import mongoose, { Types } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      default: null,
    },
    password: { type: String, required: true },
    avatarBackground: {
      type: String,
      default: "#FAFAFA",
    },
    profileImage: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "EMPLOYEE",
      enum: ["MANAGER", "EMPLOYEE"],
    },
    accountId: {
      type: String,
      required: true,
    },
    roster: {
      type: Types.ObjectId,
      required: true,
      ref: "rosters",
    },
  },
  { timestamps: true, collection: "users" }
);
userSchema.index({ email: 1 });
userSchema.index({ accountId: 1 });
export default mongoose.model("users", userSchema);
