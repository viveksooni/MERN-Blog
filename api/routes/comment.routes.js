import e from "express";
import {
  createComment,
  getComment,
  editComment,
  deleteComment,
} from "../controllers/comment.controllers.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const Router = e.Router();

Router.post("/create", verifyUser, createComment);
Router.get("/:postId", verifyUser, getComment);
Router.put("/:commentId", verifyUser, editComment);
Router.delete("/:commentId", verifyUser, deleteComment);
export default Router;
