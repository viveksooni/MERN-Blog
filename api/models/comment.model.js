import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      require: true,
    },
    postId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    likedBy: {
      type: Array,
      default: [],
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
