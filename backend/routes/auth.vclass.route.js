// File: backend/routes/auth.vclass.route.js
import express from 'express';
import { signIn } from '../controllers/auth.vclass.controller.js';

const router = express.Router();

// VClass login route
router.post('/vclass/login', signIn);

export default router;
