
import express from 'express';
import * as authController from './../controllers/authController';

const router = express.Router();

// Login
router.post('/login', authController.loginUser);

// Register
router.post('/register', authController.registerUser);

export default router;
