import express from 'express';
import { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher, loginTeacher } from '../controllers/teacherController.js';

const router = express.Router();

router.post('/', createTeacher);
router.post('/login', loginTeacher);
router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.patch('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;
