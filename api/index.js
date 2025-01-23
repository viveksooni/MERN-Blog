import express from "express";
import mongoose from "mongoose";

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://sonivivek346:URtn9tJwe4rSWRoX@mernblog.wojfj.mongodb.net/?retryWrites=true&w=majority&appName=MernBlog"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
