import { Response, NextFunction } from "express";
import { validateJwtToken } from "../utils/jwt";
import { AppRequest } from "../types";

export const validateSessionHeader = (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken =
      req.headers?.["Authorization"] || req.headers?.["authorization"];
    if (!authToken) throw new Error("Token is required");
    const tokens = authToken.toString().split(" ");
    if (tokens.length !== 2) throw new Error("Invalid token");
    // if(tokens[0]!=="bea")//Bearer
    //Bearer token validation need to be added
    // console.log({ token: tokens[1], type: tokens[0] });
    const payload = validateJwtToken(tokens[1], false);
    // req.user = payload
    if (typeof payload === "string") throw new Error("Invalid token");
    req.payload = payload;
    next();
  } catch (e: any) {
    return res
      .status(401)
      .jsonp({ error: true, message: e?.["message"] || "Invalid session" });
  }
};
