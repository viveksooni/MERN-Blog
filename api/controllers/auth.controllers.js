import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      next(errorHandler(400, "All fields are required"));
      return;
    }

    const validUser = await User.findOne({ email });

    if (!validUser) {
      next(errorHandler(400, "User does not exist"));
      return;
    }

    const isValidPassword = bcryptjs.compareSync(password, validUser.password);

    if (!isValidPassword) {
      next(errorHandler(400, "Invalid Password"));
      return;
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);
    console.log(process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;
    return res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ rest });
  } catch (e) {
    next(e);
  }
};
