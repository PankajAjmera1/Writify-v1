import Post from "../models/post.models.js";
import { errorHandler} from '../utils/error.js'



export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }
    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  };


  //get post

  export const getposts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
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
  
      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
      });
    } catch (error) {
      next(error);
    }
  };


  //Delete Post
  export const deletepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try {
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json('The post has been deleted');
    } catch (error) {
      next(error);
    }
  };


  //update post
  export const updatepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  };





// Like a post
export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
      if (post.dislikes.includes(req.user.id)) {
        post.dislikes.pull(req.user.id);
      }
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(400).json({ message: 'You already liked this post' });
    }
  } catch (error) {
    next(error);
  }
};

// Dislike a post
export const dislikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.dislikes.includes(req.user.id)) {
      post.dislikes.push(req.user.id);
      if (post.likes.includes(req.user.id)) {
        post.likes.pull(req.user.id);
      }
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(400).json({ message: 'You already disliked this post' });
    }
  } catch (error) {
    next(error);
  }
};

// Share a post
export const sharePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.shares += 1;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// Favorite a post
export const favoritePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.favorites.includes(req.user.id)) {
      post.favorites.push(req.user.id);
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(400).json({ message: 'You already favorited this post' });
    }
  } catch (error) {
    next(error);
  }
};