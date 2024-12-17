import express from 'express';
import {
  createMCQ,
  getMCQsByClass,
  getMCQ,
  updateMCQ,
  deleteMCQ,
} from '../controllers/mcqController.js';

const router = express.Router();


router.post('/create', createMCQ);

router.get('/:classId', getMCQsByClass);


router.get('/mcq/:id', getMCQ);


router.patch('/update/:id', updateMCQ);

router.delete('/delete/:id', deleteMCQ);

export default router;
