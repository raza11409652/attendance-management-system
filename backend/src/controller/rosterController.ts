import { NextFunction, Response } from "express";
import { AppRequest, RosterBody } from "../types";
import rosterService from "../service/roasterService";
import { Types, isValidObjectId } from "mongoose";

// export
class RosterController {
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async handleRosterCreation(
    req: AppRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body: RosterBody = req.body;
      const response = await rosterService.newRosterCreation({
        ...body,
        timeTable: body.shift,
        accountId: req.payload?.accountId,
      });
      return res.jsonp(response);
      // console.log(req.body);
    } catch (e) {
      console.log("Error", e);
    }
  }

  async updateRosterSingle(req: AppRequest, res: Response) {
    try {
      const id = req.params?.["id"];
      const body: RosterBody = req.body;
      if (!id || !isValidObjectId(id))
        throw new Error("Invalid roster id passed");
      const filter = {
        _id: new Types.ObjectId(id),
        accountId: req.payload?.accountId,
      };
      const data = await rosterService.getRosterDetails(filter);
      if (!data) throw new Error("Not found");
      const updated = await rosterService.updateRoster(data._id, {
        ...body,
        timeTable: body.shift,
      });
      return res.jsonp(updated);
    } catch (e) {
      console.log("Error", e);
    }
  }

  async getRosters(req: AppRequest, res: Response) {
    const filter = {
      accountId: req.payload?.accountId,
    };
    const records = await rosterService.getRosters(filter);
    return res.json(records);
  }
}

const rosterController = new RosterController();

export default rosterController;
