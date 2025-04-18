const express = require('express');
const {
  getContents,
  getContent,
  getTrending,
  getContentByCategory,
  createContent,
  updateContent,
  deleteContent
} = require('../controllers/content');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getContents);
router.get('/trending', getTrending);
router.get('/:id', getContent);
router.get('/category/:categoryId', getContentByCategory);

// Protected admin routes
router.post('/', protect, authorize('admin'), createContent);
router.put('/:id', protect, authorize('admin'), updateContent);
router.delete('/:id', protect, authorize('admin'), deleteContent);

module.exports = router;
