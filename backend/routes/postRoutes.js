// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPost, getPosts, getPostById, updatePost, deletePost,
  likePost, unlikePost, addComment,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPosts).post(protect, createPost);
router.route('/:id').get(getPostById).put(protect, updatePost).delete(protect, deletePost);
router.route('/:id/like').put(protect, likePost);
router.route('/:id/unlike').put(protect, unlikePost);
router.route('/:id/comment').post(protect, addComment);

module.exports = router;