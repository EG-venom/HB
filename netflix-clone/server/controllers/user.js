const User = require('../models/User');
const Content = require('../models/Content');

// @desc    Get user's "My List"
// @route   GET /api/user/my-list
// @access  Private
exports.getMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'myList',
      populate: {
        path: 'genres'
      }
    });

    res.status(200).json({
      success: true,
      count: user.myList.length,
      data: user.myList
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add content to user's "My List"
// @route   POST /api/user/my-list/:contentId
// @access  Private
exports.addToMyList = async (req, res) => {
  try {
    const content = await Content.findById(req.params.contentId);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Content not found with id of ${req.params.contentId}`
      });
    }

    const user = await User.findById(req.user.id);

    // Check if content is already in user's list
    if (user.myList.includes(req.params.contentId)) {
      return res.status(400).json({
        success: false,
        message: 'Content already in your list'
      });
    }

    // Add to list
    user.myList.push(req.params.contentId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Content added to your list',
      data: user.myList
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove content from user's "My List"
// @route   DELETE /api/user/my-list/:contentId
// @access  Private
exports.removeFromMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if content is in user's list
    if (!user.myList.includes(req.params.contentId)) {
      return res.status(400).json({
        success: false,
        message: 'Content not in your list'
      });
    }

    // Remove from list
    user.myList = user.myList.filter(
      item => item.toString() !== req.params.contentId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Content removed from your list',
      data: user.myList
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's watch history
// @route   GET /api/user/watch-history
// @access  Private
exports.getWatchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'watchHistory.content',
      populate: {
        path: 'genres'
      }
    });

    res.status(200).json({
      success: true,
      count: user.watchHistory.length,
      data: user.watchHistory
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add or update content in watch history
// @route   POST /api/user/watch-history/:contentId
// @access  Private
exports.updateWatchHistory = async (req, res) => {
  try {
    const content = await Content.findById(req.params.contentId);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Content not found with id of ${req.params.contentId}`
      });
    }

    const user = await User.findById(req.user.id);
    const { progress } = req.body;

    // Check if content is already in watch history
    const existingIndex = user.watchHistory.findIndex(
      item => item.content.toString() === req.params.contentId
    );

    if (existingIndex !== -1) {
      // Update existing entry
      user.watchHistory[existingIndex].progress = progress;
      user.watchHistory[existingIndex].watchedAt = Date.now();
    } else {
      // Add new entry
      user.watchHistory.push({
        content: req.params.contentId,
        progress
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Watch history updated',
      data: user.watchHistory
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    // Fields to update
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update password
// @route   PUT /api/user/update-password
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
