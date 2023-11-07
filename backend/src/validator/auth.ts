import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const registrationBodyValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isStrongPassword().withMessage("Invalid Password"),
  body("name").isString().withMessage("Invalid name"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).jsonp({ error: true, errors });
    }
    next();
  },
];
export const loginBodyValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isStrongPassword().withMessage("Invalid Password"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).jsonp({ error: true, errors });
    }
    next();
  },
];

export const addNewEmployeeValidator = [
  body("name").isString(),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage("Password is invalid"),
  body("roster").isMongoId().withMessage("Roster is required"),
  body("email").isEmail().withMessage("Email should be a valid email"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).jsonp({ error: true, errors });
    }
    next();
  },
];
