import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

/**
 * Route for getting for all the Posts
 */
router.get("/getPosts", getPosts);

/**
 * Route for a specific post retrieval
 */
router.get("/getPost/:id", getPost);

/**
 * Route to create post
 */
router.post("/createPost", createPost);

/**
 * Route to delete post
 */
router.delete("/deletePost/:id", deletePost);

/**
 * Route for update post
 */
router.put("/updatePost", updatePost);

export default router;
