import { Router } from "express";
import authController from "../controller/authController";
import { loginBodyValidator, registrationBodyValidator } from "../validator/auth";
const authRoutes = Router();
authRoutes.post("/login", loginBodyValidator, authController.handleLogin);
authRoutes.post(
  "/register",
  registrationBodyValidator,
  authController.handleRegistration
);

export default authRoutes;
