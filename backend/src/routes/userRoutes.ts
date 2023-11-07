import { Router } from "express";
import userController from "../controller/userController";
import { addNewEmployeeValidator } from "../validator/auth";
import { validateRole } from "../middleware/role";

const userRoutes = Router();

userRoutes.post(
  "/",
  validateRole(["MANAGER"]),
  addNewEmployeeValidator,
  userController.newEmployeeAdd
);
userRoutes.get("/", validateRole(["MANAGER"]), userController.getUsers);

export default userRoutes;
