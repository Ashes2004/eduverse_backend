import express from 'express';
import { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, loginStudent, UpdatePoints } from '../controllers/studentController.js';

const router = express.Router();

router.post('/', createStudent);
router.post('/login', loginStudent);
router.post('/points', UpdatePoints);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
