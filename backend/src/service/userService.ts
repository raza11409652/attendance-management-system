import { Types } from "mongoose";
import user from "../schema/user";
import { User } from "../types";

class UserService {
  constructor() {
    console.log("user service is init");
  }

  async newUser(u: User) {
    const a = new user(u);
    return await a.save();
  }
  async getUserByEmail(email: string) {
    const data = await user.findOne({ email });
    return data;
  }
  async getUserByID(id: Types.ObjectId) {
    const data = await user
      .findById(id)
      .populate("roster", [], "rosters")
      .lean();
    return data;
  }
  async getUsers(f: { [key: string]: any }, limit: number, skip: number) {
    const c = user.find(f).count();
    const r = user
      .find(f, { password: 0 })
      .populate("roster", [], "rosters")
      .limit(limit)
      .skip(skip)
      .lean();
    const [count, records] = await Promise.all([c, r]);
    return { count, records };
  }
}

const userService = new UserService();
export default userService;
