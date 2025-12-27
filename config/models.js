const mongoose = require('mongoose');

// Wish Schema
const wishSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Wish text is required'],
    minlength: [1, 'Wish cannot be empty'],
    maxlength: [200, 'Wish cannot exceed 200 characters'],
    trim: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    default: null // Can be used for future user authentication
  },
  tags: [{
    type: String
  }],
  likes: {
    type: Number,
    default: 0
  }
});

// Update the updatedAt field before saving
wishSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Wish = mongoose.model('Wish', wishSchema);

module.exports = Wish;
