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

    const { password: pass, ...rest } = validUser._doc;
    return res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ ...rest });
  } catch (e) {
    next(e);
  }
};

export const google = async (req, res, next) => {
  let { email, photoUrl: photoURL, username } = req.body;
  //check if user already exists

  try {
    let user = await User.findOne({ email });

    if (user) {
      console.log("user already exists, directly logging in");

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { password, ...withoutPassword } = user._doc;
      res
        .status(200)
        .cookie("access_token", token)
        .json({ ...withoutPassword });
      return;
    }

    //if not exists create one
    const SameUserName = await User.findOne({ username });
    if (SameUserName) {
      username = username + "_" + Math.random().toString(36).slice(-8);
    }
    const Dummy_password = "12345";
    const hashed_dummy_password = bcryptjs.hashSync(Dummy_password, 10);
    const newUser = new User({
      username,
      email,
      password: hashed_dummy_password,
      photoURL,
    });

    await newUser.save();

    const verifyUser = await User.findOne({ email });

    const token = jwt.sign({ id: verifyUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password, ...withoutPassword } = verifyUser._doc;
    return res
      .status(200)
      .cookie("access_token", token)
      .json({ ...withoutPassword });
  } catch (e) {
    next(e);
  }
};
