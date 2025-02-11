import User from "../models/user.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import bcryptjs from "bcryptjs";
export const updateUser = async (req, res, next) => {
  let { username, email, photoURL, password } = req.body;
  const { userId } = req.params;

  if (userId !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  if (password) {
    if (password.length < 6) {
      return next(errorHandler(400, "Password should at least be 6 character"));
    }
    password = bcryptjs.hashSync(password, 10);
  }

  if (username) {
    if (username.length < 7 || username.length > 20) {
      return next(errorHandler(400, "username should be between 7 and 20"));
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "username can not contain spaces"));
    }
    if (username !== username.toLowerCase()) {
      return next(
        errorHandler(400, "username cannot contain uppercase characters")
      );
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "username can only contains character and numbers")
      );
    }
  }
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "no user found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, photoURL, password },
      { new: true, runValidators: true }
    );

    let { password: _, ...rest } = updatedUser._doc;

    return res.status(200).json(rest);
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "you are not allowed to delete this user!!"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
