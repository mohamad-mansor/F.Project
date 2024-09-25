import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();
router.post("/", createPost);
router.delete("/:postId", deletePost);
router.patch("/:postId", updatePost);
export default router;
