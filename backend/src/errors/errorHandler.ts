import { Request, Response, NextFunction } from "express";
import { AppError } from "./appError";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   console.log(err.description, "-------> DESCRIPTION");
  //   console.log(err.message, "-------> MESSAGE");
  //   console.log(err.name, "-------> NAME",);
  if (err) {
    // console.log(err.name);
    const status = err.statusCode || 400;
    const message = err.description || err.message || "Api error";
    return res.status(status).json({ error: true, message: message });
  }
  next();
};

export default errorHandler;
