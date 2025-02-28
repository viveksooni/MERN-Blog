import express from "express";
import { verifyUser } from "../middleware/verifyUser.middleware.js";
import {
  CreatePost,
  getAllPost,
  getPost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/create-post", verifyUser, CreatePost);
router.get("/postId/:id", verifyUser, getPost);
router.get("/getPosts", verifyUser, getAllPost);

export default router;
