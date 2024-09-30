import express from "express";
import { signup, signin, signout } from "../controllers/authController.js";
import { signupValidation, signinValidation, validateSignup, validateSignin } from "../middleware/validationMiddleware.js";

const router = express.Router();

// Routen für die Authentifizierung
router.post("/signup", signupValidation, validateSignup, signup);
router.post('/signin', signinValidation, validateSignin, signin);
router.post("/signout", signout);

export default router;
