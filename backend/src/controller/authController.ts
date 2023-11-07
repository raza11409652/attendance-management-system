import { NextFunction, Request, Response } from "express";
import { AuthLogin, SessionPayload, User } from "../types";
import { compareBcryptHash, generateBcryptHash } from "../utils/password";
import userService from "../service/userService";
import { generateJwtToken } from "../utils/jwt";
import { getAccountId } from "../utils/string";

// export class Auth
class AuthController {
  constructor() {
    console.log("Auth controller init");
  }

  /**
   * Auth request Login handler
   * this will accept email , password  as string
   * will return JWT Token - session , refresh token and user profile
   * @param req
   * @param res
   */
  async handleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const body: AuthLogin = req.body;
      // step 1 -  check is email exist in database OR not
      // step 2 - check is password is valid
      const data = await userService.getUserByEmail(body.email);
      if (!data) throw new Error("Auth failed ");
      const flag = compareBcryptHash(data.password, body.password);
      if (!flag)
        throw new Error(
          "Auth failed , Password and email combination is invalid"
        );
      const p: SessionPayload = {
        id: data._id.toString(),
        email: data.email,
        accountId: data.accountId || "",
        type: "SESSION",
        role: data.role,
      };
      const sessionToken = generateJwtToken(p, false);
      const refreshToken = generateJwtToken({ ...p, type: "REFRESH" }, true);

      return res.jsonp({
        token: {
          refresh: refreshToken,
          session: sessionToken,
        },
        user: {
          ...p,
          name: data.name,
          avatar: data.avatarBackground,
          profile: data.profileImage,
        },
      });
    } catch (e) {
      // console.log("Error", e);
      next(e);
    }
  }

  /**
   * Auth request Register handler
   * @param req
   * @param res
   */
  async handleRegistration(req: Request, res: Response, next: NextFunction) {
    try {
      const body: User = req.body;
      body.password = generateBcryptHash(body.password);
      body.role = "MANAGER";
      body.accountId = getAccountId();
      const response = await userService.newUser(body);
      return res.jsonp(response);
      // return res.jsonp(body);
    } catch (e) {
      // console.log("Error", e);
      next(e);
    }
  }
}
const authController = new AuthController();
export default authController;
