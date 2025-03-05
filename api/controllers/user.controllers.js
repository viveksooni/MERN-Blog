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
  console.log("accounted delete request");

  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "you are not allowed to delete this user!!"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const signOutUser = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User signOut Successfully" });
  } catch (e) {
    next(e);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res
        .status(401)
        .json({ message: "you are not allowed to get users" });
    }
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const users = await User.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ updatedAt: sortDirection });

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUser = await User.countDocuments();
    const now = new Date();

    const dateLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDay()
    );

    const LastMonthUsers = await User.countDocuments({
      createdAt: { $gte: dateLastMonth },
    });
    return res.status(200).json({
      users: usersWithoutPassword,
      totalUsers: totalUser,
      UserAddedLastMonth: LastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};
