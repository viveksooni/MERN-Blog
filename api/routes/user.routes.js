import express from "express";
import {
  deleteUser,
<<<<<<< HEAD
  getUserDetails,
=======
>>>>>>> 1c9dcd0552011ad1f3a3844891d686fb18824008
  getUsers,
  signOutUser,
  updateUser,
} from "../controllers/user.controllers.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const router = express.Router();

router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/signout", signOutUser);
router.get("/getUsers", verifyUser, getUsers);
<<<<<<< HEAD
router.get("/user/:userId", getUserDetails);
=======

>>>>>>> 1c9dcd0552011ad1f3a3844891d686fb18824008
export default router;
