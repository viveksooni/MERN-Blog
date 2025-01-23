import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const hashedPassword =  bcryptjs.hashSync(password, 10);
  console.log("password", password);
  console.log(hashedPassword);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.json({ msg: "Signup success" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "Something went wrong" });
  }
};
