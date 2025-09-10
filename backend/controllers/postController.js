// controllers/postController.js
const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Create a post
exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const newPost = new Post({
      title,
      content,
      category,
      author: req.user.id,
    });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all posts (with search and category filter)
exports.getPosts = async (req, res) => {
  const { search, category } = req.query;
  try {
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    if (category) {
      query.category = category;
    }
    const posts = await Post.find(query).populate('author', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name').populate('comments.user', 'name');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to update this post' });
    }
    
    const { title, content, category } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true }
    ).populate('author', 'name');
    
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this post' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been liked by this user
    if (post.likes.some((like) => like.equals(req.user.id))) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift(req.user.id);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc    Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has not yet been liked by this user
    if (!post.likes.some((like) => like.equals(req.user.id))) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
    }
    // Get remove index
    post.likes = post.likes.filter(
        ({ id }) => id.toString() !== req.user.id
    );
    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc    Comment on a post
exports.addComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      user: req.user.id
    };

    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};