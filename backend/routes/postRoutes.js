import express from "express";
import { createPost, deletePost, updatePost } from "../controllers/postController.js";
import { authenticateToken } from "../middleware/authmiddleware.js";
import { checkRole } from "../middleware/checkRole.js"; // Import the role-checking middleware

const router = express.Router();

// All authenticated users can create posts
router.post("/", authenticateToken, createPost);

// Only admins can delete posts
router.delete("/:postId", authenticateToken, checkRole(["admin"]), deletePost);

// Both admins and users can update posts
router.patch("/:postId", authenticateToken, checkRole(["admin", "user"]), updatePost);

export default router;