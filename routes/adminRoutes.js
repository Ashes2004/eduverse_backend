import express from 'express';
import {  getAllAdmins, getAdminById, updateAdminById, deleteAdminById, signup, login } from '../controllers/adminController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', getAllAdmins);
router.get('/:id', getAdminById);
router.patch('/:id', updateAdminById);
router.delete('/:id', deleteAdminById);

export default router;
