import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controllers.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const router = express.Router();

router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
export default router;
