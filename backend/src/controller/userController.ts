import { NextFunction, Response } from "express";
import { AppRequest, User } from "../types";
import { generateBcryptHash } from "../utils/password";
import userService from "../service/userService";
import { getPagination, getPaginationData } from "../utils/pagination";

class UserController {
  async newEmployeeAdd(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const body: User = req.body;
      body.role = "EMPLOYEE";
      body.password = generateBcryptHash(body.password);
      body.accountId = req.payload?.accountId;
      //   return res.json(body);
      const data = await userService.newUser(body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req: AppRequest, res: Response) {
    const page = req.query.page ? Number(req.query.page) : 1;
    const size = 50; // per page
    const { limit, skip } = getPagination(page, size);
    const { records, count } = await userService.getUsers(
      {
        accountId: req.payload?.accountId,
      },
      limit,
      skip
    );
    const response = getPaginationData(count, page, limit, records);
    return res.jsonp(response);
    // return res.jsonp(response);
  }
}
const userController = new UserController();
export default userController;
