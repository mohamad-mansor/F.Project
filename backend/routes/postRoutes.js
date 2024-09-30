import express from "express";
import { createPost, deletePost, updatePost } from "../controllers/postController.js";
import { authenticateToken } from "../middleware/authmiddleware.js";
import { checkRole } from "../middleware/checkRole.js"; // Import the role-checking middleware

const router = express.Router();

router.post("/", authenticateToken, createPost); // All authenticated users can create posts
router.delete("/:postId", authenticateToken, checkRole(["admin"]), deletePost); // Only admins can delete posts
router.patch("/:postId", authenticateToken, checkRole(["admin", "user"]), updatePost); // Admins and users can update posts

export default router;