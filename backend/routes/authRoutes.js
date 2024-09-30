import express from 'express';
import { signup, signin, signout, refreshToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);  // User registration route
router.post('/signin', signin);  // User login route
router.post('/refresh-token', refreshToken);  // Route to refresh the JWT token
router.post('/signout', signout);  // User logout route

export default router;

