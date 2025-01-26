import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/ErrorHandler.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      next(errorHandler(400, "All fields are required"));
    }

    const user = await User.findOne({ email });
    if (user) {
      next(errorHandler(400, "User already exists"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    console.log("password", password);
    console.log(hashedPassword);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.json({ msg: "Signup success" });
  } catch (e) {
    next(e);
  }
};
