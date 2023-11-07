import { Router } from "express";
import attendanceController from "../controller/attendanceController";
import { validateRole } from "../middleware/role";
import { markAttendanceBodyValidate } from "../validator/attendanceBody";

const attendanceRoutes = Router();

attendanceRoutes.post(
  "/",
  validateRole(["EMPLOYEE"]),
  markAttendanceBodyValidate,
  attendanceController.markAttendance
);
attendanceRoutes.post(
  "/checkout",
  validateRole(["EMPLOYEE"]),
  attendanceController.checkoutAttendance
);
attendanceRoutes.get(
  "/",
  validateRole(["EMPLOYEE", "MANAGER"]),
  attendanceController.getAttendanceList
);
attendanceRoutes.get(
  "/check-in/status",
  validateRole(["EMPLOYEE"]),
  attendanceController.getTodayCheckInStatus
);
export default attendanceRoutes;
