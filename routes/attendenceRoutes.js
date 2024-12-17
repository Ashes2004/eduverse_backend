import express from 'express';
import {
  createAttendance,
  addStudentToAttendance,
  getAllAttendances,
} from '../controllers/attendanceController.js';

const router = express.Router();

// Route to create a new attendance record
router.post('/', createAttendance);

// Route to add a student to an existing attendance record
router.patch('/:id', addStudentToAttendance);

// Route to get all attendance records
router.get('/', getAllAttendances);

export default router;
