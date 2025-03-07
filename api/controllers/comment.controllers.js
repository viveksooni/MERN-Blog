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

export const editComment = async (req, res, next) => {
  const reqComment = req.body.comment;
  const { commentId } = req.params;

  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { comment: reqComment },
      { new: true }
    );

    if (comment) {
      return res.status(200).json(comment);
    }
  } catch (e) {
    next(e);
  }
};

export const deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (comment) {
      return res.status(200).json({ message: "Comment deleted successfully" });
    }
    return res.status(404).json({ message: "Comment not found" });
  } catch (e) {
    next(e);
  }
};
