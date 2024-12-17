import express from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from '../controllers/subjectController.js';

const router = express.Router();

router.post('/create', createSubject);
router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);
router.put('/update/:id', updateSubject);
router.delete('/delete/:id', deleteSubject);

export default router;
