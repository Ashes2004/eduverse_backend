import express from 'express';
import { createQuizResponse, getAllQuizzes } from '../controllers/quizController.js';
 

const router = express.Router();

// Create a new quiz response
router.post('/', createQuizResponse);

// Get all quiz responses
router.get('/:studentId', getAllQuizzes);


export default router;
