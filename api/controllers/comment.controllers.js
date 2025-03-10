import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";

export const createComment = async (req, res, next) => {
  try {
    const { postId, userId, comment } = req.body;

    if (req.user.id != userId) {
      return next(errorHandler(401, "Unauthorized access"));
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

    return next(errorHandler(404, "No comments found"));
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  const reqComment = req.body.comment;
  const { commentId } = req.params;
  const commentToEdit = await Comment.findById(commentId);
  if (!commentToEdit) {
    next(errorHandler(404, "No comment found"));
  }
  if (req.user.id !== commentToEdit.userId && req.user.isAdmin) {
    next(
      errorHandler(401, "Your do not have authorization to edit this comment")
    );
  }
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
  const { commentId } = req.params;

  const commentToDelete = await Comment.findById(commentId);
  if (req.user.id !== commentToDelete.userId && !req.user.isAdmin) {
    next(errorHandler(401, "Unauthorized access"));
  }
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

export const likeComment = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      next(errorHandler(404, "Comment not found"));
    }

    const isLiked = comment.likedBy.indexOf(userId);

    if (isLiked === -1) {
      comment.likedBy.push(userId);
      comment.likeCount++;
      await comment.save();
      return res.status(200).json(comment);
    } else {
      comment.likedBy.splice(isLiked, 1);
      comment.likeCount--;
      await comment.save();
      return res.status(200).json(comment);
    }
  } catch (e) {
    next(e);
  }
};
