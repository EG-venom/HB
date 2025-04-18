const Content = require('../models/Content');
const Category = require('../models/Category');

// @desc    Get all content with filtering, sorting, pagination
// @route   GET /api/content
// @access  Public
exports.getContents = async (req, res) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(field => delete reqQuery[field]);

    // Create query string and operators ($gt, $gte, etc)
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resources
    let query = Content.find(JSON.parse(queryStr)).populate('genres');

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Content.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const contents = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: contents.length,
      pagination,
      data: contents
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get trending content
// @route   GET /api/content/trending
// @access  Public
exports.getTrending = async (req, res) => {
  try {
    const contents = await Content.find({ isTrending: true })
      .sort('rank')
      .populate('genres');

    res.status(200).json({
      success: true,
      count: contents.length,
      data: contents
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get content by ID
// @route   GET /api/content/:id
// @access  Public
exports.getContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate('genres');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Content not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get content by category/genre
// @route   GET /api/content/category/:categoryId
// @access  Public
exports.getContentByCategory = async (req, res) => {
  try {
    const contents = await Content.find({
      genres: req.params.categoryId
    }).populate('genres');

    res.status(200).json({
      success: true,
      count: contents.length,
      data: contents
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new content
// @route   POST /api/content
// @access  Private/Admin
exports.createContent = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const content = await Content.create(req.body);

    res.status(201).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Private/Admin
exports.updateContent = async (req, res) => {
  try {
    let content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Content not found with id of ${req.params.id}`
      });
    }

    content = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private/Admin
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Content not found with id of ${req.params.id}`
      });
    }

    await content.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
