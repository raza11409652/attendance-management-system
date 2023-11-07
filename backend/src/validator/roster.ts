import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { Day, Days, RosterTimeTable } from "../types";
import { isValidTime, minuteDifference } from "../utils/time";
// import dayjs from "dayjs";
export const rosterBodyValidator = [
  body("title").isString().withMessage("Title is required"),
  body("shift")
    .isArray({ min: 1 })
    .withMessage("Shift should be of min 1 Length"),
  body("shift").custom((a: Array<RosterTimeTable>, { req }) => {
    a.forEach((e) => {
      if (typeof e !== "object")
        throw new Error("Shift element should be an object");
      //   console.log({ e });
      if (!e.day || !e.endTime || !e.startTime)
        throw new Error("Required data is missing");
      if (Days.includes(e.day as Day) === false)
        throw new Error("Invalid day passed");
      if (!isValidTime(e.startTime) || !isValidTime(e.endTime))
        throw new Error("Invalid  time passed");
      const diff = minuteDifference(e.startTime, e.endTime);
      console.log(diff);
      if (diff == 0) {
        throw new Error("Invalid time passed in payload");
      }
    });
    const days = [...new Set(a.map((a) => a.day))];
    if (days.length !== a.length)
      throw new Error("Look like duplicate days passed");
    // console.log(a, req.body);
    // Need to check the passed start time and end time is correct OR not
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0)
      return res.status(400).jsonp({ error: true, errors });
    next();
  },
];
