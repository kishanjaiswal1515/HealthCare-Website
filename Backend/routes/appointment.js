import express from "express";
import multer from "multer";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import {
  bookAppointment,
  getAppointmentsForUser,
  changeAppointmentStatus,
  uploadReport
} from "../controllers/appointmentController.js";

const router = express.Router();

// setup multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// book appointment (patient)
router.post("/book", authMiddleware, requireRole("patient"), bookAppointment);

// get appointments for logged-in user (doctor or patient)
router.get("/my", authMiddleware, getAppointmentsForUser);

// change status (doctor)
router.patch("/status/:id", authMiddleware, requireRole("doctor"), changeAppointmentStatus);

// upload medical report (patient)
router.post("/report", authMiddleware, requireRole("patient"), upload.single("report"), uploadReport);

export default router;
