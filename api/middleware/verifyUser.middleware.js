import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/ErrorHandler.js";
export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    next(errorHandler(401, "User is not authorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      next(errorHandler(401, "unauthorized error"));
    }

    req.user = user;
    next();
  });
};
