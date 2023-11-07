import { Router } from "express";
import rosterController from "../controller/rosterController";
import { validateRole } from "../middleware/role";
import { rosterBodyValidator } from "../validator/roster";
const rosterRoutes = Router();
rosterRoutes.post(
  "/",
  validateRole(["MANAGER"]),
  rosterBodyValidator,
  rosterController.handleRosterCreation
);
rosterRoutes.get("/", validateRole(["MANAGER"]), rosterController.getRosters);
rosterRoutes.put(
  "/:id",
  validateRole(["MANAGER"]),
  rosterBodyValidator,
  rosterController.updateRosterSingle
);
// rosterRoutes.post("/", () => {});
export default rosterRoutes;
