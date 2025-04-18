const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  type: {
    type: String,
    enum: ['movie', 'tv'],
    required: [true, 'Please specify content type']
  },
  genres: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  }],
  releaseYear: {
    type: Number,
    required: [true, 'Please add release year']
  },
  maturityRating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA'],
    default: 'TV-14'
  },
  duration: String, // For movies: "2h 15m", For TV: "3 Seasons"
  poster: {
    type: String,
    required: [true, 'Please add a poster image URL']
  },
  backdrop: {
    type: String,
    required: [true, 'Please add a backdrop image URL']
  },
  logo: String,
  trailerUrl: String,
  videoUrl: String,
  cast: [{
    name: String,
    character: String,
    profileImage: String
  }],
  creator: String,
  isOriginal: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  rank: {
    type: Number,
    default: 0
  },
  // For TV shows
  seasons: [{
    number: Number,
    episodes: [{
      number: Number,
      title: String,
      description: String,
      duration: String,
      thumbnail: String,
      videoUrl: String
    }]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Content', ContentSchema);
