import { Router } from "express";
import authRoutes from "./authRoutes";
import rosterRoutes from "./rosterRoutes";
import { validateSessionHeader } from "../middleware/session";
import userRoutes from "./userRoutes";
import attendanceRoutes from "./attendances";

const appRoutes = Router();

appRoutes.use("/auth", authRoutes);
appRoutes.use("/rosters", validateSessionHeader, rosterRoutes);
appRoutes.use("/users", validateSessionHeader, userRoutes);
appRoutes.use("/attendances", validateSessionHeader, attendanceRoutes);

export default appRoutes;
