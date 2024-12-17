import express from "express";
import {
  createAssignment,
  getAssignmentsByClass,
  submitAssignment,
  gradeAssignment,
  getAllAssignments,
  updatedAssignment,
  deleteAssignment,
  getAssignmentsById,
} from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/create", createAssignment);

router.get("/:classId", getAssignmentsByClass);
router.get("/", getAllAssignments);
router.get("/id/:id", getAssignmentsById);

router.post("/submit", submitAssignment);

router.patch("/grade", gradeAssignment);
router.patch("/:id" , updatedAssignment);
router.delete("/:id" , deleteAssignment);


export default router;
