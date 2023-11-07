import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const markAttendanceBodyValidate = [
  body("image").isString().withMessage("Image in base 64 is required"),
  body("latitude").isNumeric().withMessage("Latitude is required in number"),
  body("longitude").isNumeric().withMessage("Longitude is required in number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).jsonp({ error: true, errors });
    }
    next();
  },
];
