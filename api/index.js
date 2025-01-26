import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandlerMiddleware } from "./middleware/error.middleware.js";
import cors from "cors";

dotenv.config();
// Connect to MongoDB
mongoose
  .connect(process.env.MongoDB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cors())
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
app.use("/api/v1", userRoute);
app.use("/api/v1", authRoutes);

app.use(errorHandlerMiddleware);
