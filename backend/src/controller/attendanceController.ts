import { NextFunction, Response } from "express";
import { AppRequest, CheckInAttendance, RosterTimeTable } from "../types";
import { Types } from "mongoose";
import attendanceService from "../service/attendanceService";
import { formattedDate } from "../utils/time";
import userService from "../service/userService";
import { getPagination, getPaginationData } from "../utils/pagination";
import { AppError, STATUS_CODES } from "../errors/appError";

class AttendanceController {
  /**
   * Only single checkIn per user per day is allowed
   * @param req
   * @param res
   * @returns
   */
  async markAttendance(req: AppRequest, res: Response, next: NextFunction) {
    try {
      if (!req.payload)
        throw new AppError(STATUS_CODES.BAD_REQUEST, "user session not found");
      //Load current user roster
      const userData = await userService.getUserByID(
        new Types.ObjectId(req.payload.id)
      );
      if (!userData)
        throw new AppError(STATUS_CODES.NOT_FOUND, "user data not found");
      const ob: { [key: string]: any } = new Object(userData);
      // console.log({ ob });
      const timeTable: Array<RosterTimeTable> =
        ob?.["roster"]?.["timeTable"] || [];
      console.log({ timeTable });
      const ts = new Date();
      const date = formattedDate(ts);
      //   console.log(date);
      const object: CheckInAttendance = {
        accountId: req.payload?.accountId || "",
        user: new Types.ObjectId(req.payload.id),
        checkInTimestamp: ts,
        date,
        roster: ob?.["roster"]?.["_id"],
        checkInDelay: 0,
        image:req.body.image,
        latitude:req.body.latitude?Number(req.body.latitude):0,
        longitude:req.body.latitude?Number(req.body.longitude):0,

      };
      const response = await attendanceService.newAttendance(object);
      return res.json(response);
    } catch (e) {
      // console.log("Error", e);
      next(e);
    }
  }

  /**
   * Check out from attendance
   * @param req
   * @param res
   * @returns
   */
  async checkoutAttendance(req: AppRequest, res: Response, next: NextFunction) {
    try {
      if (!req.payload)
        throw new AppError(
          STATUS_CODES.FORBIDDEN,
          "User session payload not found "
        );
      const ts = new Date();
      const date = formattedDate(ts);
      const filter = { date, user: new Types.ObjectId(req.payload.id) };
      const data = await attendanceService.getAttendance(filter);
      if (!data || data.checkOutTimestamp !== null)
        throw new AppError(STATUS_CODES.NOT_FOUND, "Check in data not found");
      const response = await attendanceService.updateAttendance(data._id, {
        checkOutTimestamp: ts,
      });
      return res.jsonp(response);
    } catch (e) {
      // console.log("Error", e);
      next(e);
    }
  }

  /**
   * Get list of attendance
   * @param req
   * @param res
   * @returns
   */
  async getAttendanceList(req: AppRequest, res: Response, next: NextFunction) {
    if (!req.payload)
      throw new AppError(STATUS_CODES.FORBIDDEN, "user data not found");
    const user =
      req.payload.role === "MANAGER" ? req.query?.["user"] : req.payload.id;
    const page = req.query.page ? Number(req.query.page) : 1;
    const size = 50;
    const { limit, skip } = getPagination(page, size);
    const filter = {
      accountId: req.payload.accountId,
      ...(user && {
        user: new Types.ObjectId(user),
      }),
    };
    const { count, records } = await attendanceService.getRecords(
      filter,
      limit,
      skip
    );
    const response = getPaginationData(count, page, limit, records);
    return res.jsonp(response);
  }

  async getTodayCheckInStatus(
    req: AppRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.payload)
        throw new AppError(STATUS_CODES.FORBIDDEN, "user session not found");
      const filter = {
        date: formattedDate(new Date()),
        user: new Types.ObjectId(req.payload.id),
      };
      const data = await attendanceService.getAttendance(filter);
      return res.jsonp(data);
    } catch (e) {
      next(e);
      // console.log("Error", e);
    }
  }
}
const attendanceController = new AttendanceController();
export default attendanceController;
