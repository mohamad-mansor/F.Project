import express from "express";
import { createPost, deletePost, updatePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/posts", createPost);
router.delete("/posts/:postId", deletePost);
router.patch("/posts/:postId", updatePost);

export default router;