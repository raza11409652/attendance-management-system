import { Types } from "mongoose";
import roster from "../schema/roster";

class RosterService {
  async newRosterCreation(p: { [key: string]: any }) {
    const a = new roster(p);
    return await a.save();
  }

  async getRosterDetails(filter: { [key: string]: any }) {
    return await roster.findOne({ ...filter }).lean();
  }
  async updateRoster(id: Types.ObjectId, data: { [key: string]: any }) {
    return await roster.findByIdAndUpdate(id, data, { new: true });
  }
  async getRosters(filter: { [key: string]: any }) {
    return await roster.find(filter).lean();
  }
}
const rosterService = new RosterService();
export default rosterService;
