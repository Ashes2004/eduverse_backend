// Routes: studentEnrollmentRoutes.js

import express from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} from "../controllers/studentEnrollmentController.js";

const router = express.Router();

router.post("/", createEnrollment);
router.get("/", getAllEnrollments);
router.get("/:id", getEnrollmentById);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router;
