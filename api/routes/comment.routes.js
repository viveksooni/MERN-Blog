import e from "express";
import {
  createComment,
  getComment,
  likeComment,
  editComment,
  deleteComment,
} from "../controllers/comment.controllers.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const Router = e.Router();

Router.post("/create", verifyUser, createComment);
Router.get("/:postId", verifyUser, getComment);
Router.put("/:commentId", verifyUser, editComment);
Router.delete("/:commentId", verifyUser, deleteComment);
Router.put("/like/:commentId", verifyUser, likeComment);
export default Router;
