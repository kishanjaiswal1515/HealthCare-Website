import express from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import { createDoctorProfile, getAllDoctors, addSlot } from "../controllers/doctorController.js";

const router = express.Router();

// public: list doctors
router.get("/", getAllDoctors);

// protected: create profile (doctor only)
router.post("/create", authMiddleware, requireRole("doctor"), createDoctorProfile);

// add slot (doctor only)
router.post("/slot", authMiddleware, requireRole("doctor"), addSlot);

export default router;
