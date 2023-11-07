import { NextFunction, Response } from "express";
import { AppRequest, UserRole } from "../types";

export const validateRole = (roles: UserRole[]) => {
  return (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.payload) throw new Error("Session payload not found");
      if (roles.length > 0 && roles.includes(req.payload?.role) === false)
        throw new Error("Role is not found");
      //   console.log(validateRole, req.payload);
      next();
    } catch (e) {
      return res.status(403).json({ error: true, message: "Forbidden" });
    }
  };
};
