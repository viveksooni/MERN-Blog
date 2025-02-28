import Post from "../models/post.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";

export const CreatePost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorHandler(403, "you are not allowed to create post"));
  }
  if (!req.body.content || !req.body.title) {
    next(errorHandler(400, "provide all the required fields"));
  }

  const slug = req.body.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .join("-");
  const newPost = new Post({ ...req.body, slug, userId: req.user.id });

  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (e) {
    next(e);
  }
};

export const getPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const postData = await Post.findById(id);

    return res.status(200).json(postData);
  } catch (e) {
    next(e);
  }
};

export const getAllPost = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;

    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const LastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ LastMonthPosts, totalPosts, posts });
  } catch (e) {
    next(e);
  }
};
