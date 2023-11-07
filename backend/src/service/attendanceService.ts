import { Types } from "mongoose";
import attendance from "../schema/attendance";
import { CheckInAttendance } from "../types";

class AttendanceService {
  async newAttendance(p: CheckInAttendance) {
    const a = new attendance(p);
    return await a.save();
  }

  async getAttendance(filter: { [key: string]: any }) {
    return await attendance.findOne(filter).lean();
  }
  async updateAttendance(id: Types.ObjectId, data: { [key: string]: any }) {
    return await attendance.findByIdAndUpdate(id, data, { new: true });
  }

  async getRecords(f: { [key: string]: any }, limit: number, skip: number) {
    const c = attendance.find(f).count();
    const r = attendance.find(f).limit(limit).skip(skip).lean();
    const [count, records] = await Promise.all([c, r]);
    return { count, records };
  }
}
const attendanceService = new AttendanceService();
export default attendanceService;
