import express from "express";
import { updateUser } from "../controllers/user.controllers.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const router = express.Router();

router.put("/update/:userId", verifyUser, updateUser);
export default router;
