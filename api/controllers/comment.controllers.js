import { errorHandlerMiddleware } from "../middleware/error.middleware.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { postId, userId, comment } = req.body;

    if (req.user.id != userId) {
      return next(errorHandlerMiddleware(401, "Unauthorized access"));
    }

    const newComment = new Comment({
      postId,
      userId,
      comment,
    });

    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    if (comments) {
      return res.status(200).json({ comments });
    }

    return next(errorHandlerMiddleware(404, "No comments found"));
  } catch (error) {
    next(error);
  }
};
