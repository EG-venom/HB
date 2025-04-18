const express = require('express');
const {
  getMyList,
  addToMyList,
  removeFromMyList,
  getWatchHistory,
  updateWatchHistory,
  updateProfile,
  updatePassword
} = require('../controllers/user');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// My List routes
router.get('/my-list', getMyList);
router.post('/my-list/:contentId', addToMyList);
router.delete('/my-list/:contentId', removeFromMyList);

// Watch History routes
router.get('/watch-history', getWatchHistory);
router.post('/watch-history/:contentId', updateWatchHistory);

// Profile routes
router.put('/profile', updateProfile);
router.put('/update-password', updatePassword);

module.exports = router;
