import express from 'express';
import { createClass, updateClass, getClassesByInstitute, deleteClass, getClassByInstituteAndClassId, getAllClasses, getClassByID } from '../controllers/classController.js';

const router = express.Router();
router.get('/' , getAllClasses);
router.get('/:id' , getClassByID);
router.post('/create', createClass);
router.patch('/update/:id', updateClass);
router.get('/institute/:instituteId', getClassesByInstitute);
router.get('/:instituteId/:classId', getClassByInstituteAndClassId);
router.delete('/delete/:id', deleteClass);

export default router;
