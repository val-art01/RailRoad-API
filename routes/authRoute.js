
import express from 'express';
import {loginUser, registerUser} from "./../controllers/authController.js";

const router = express.Router();

// Login
router.post('/login', loginUser);

// Register
router.post('/register', registerUser);

export default router;
