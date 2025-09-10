// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getAllPosts,
  deleteAnyPost,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// All admin routes are protected and require admin role
router.use(protect);
router.use(admin);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/posts', getAllPosts);
router.delete('/posts/:id', deleteAnyPost);

module.exports = router;
