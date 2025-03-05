import e from "express";
import {
  createComment,
  getComment,
} from "../controllers/comment.controllers.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const Router = e.Router();

Router.post("/create", verifyUser, createComment);
Router.get("/:postId", verifyUser, getComment);
export default Router;
