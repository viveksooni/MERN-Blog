import express from "express";
import { verifyUser } from "../middleware/verifyUser.middleware.js";
import {
  CreatePost,
  deletePost,
  editPost,
  getAllPost,
  getPost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/create-post", verifyUser, CreatePost);
router.get("/postId/:id", verifyUser, getPost);
router.get("/getPosts", verifyUser, getAllPost);
router.delete("/delete-post/:post_id/:user_id", verifyUser, deletePost);
router.put("/edit-post/:post_id/:user_id", verifyUser, editPost);

export default router;
