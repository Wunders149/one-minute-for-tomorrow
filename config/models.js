const mongoose = require('mongoose');

// Wish Schema
const wishSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Wish text is required'],
    minlength: [1, 'Wish cannot be empty'],
    maxlength: [200, 'Wish cannot exceed 200 characters'],
    trim: true,
    // Basic sanitization to prevent simple XSS
    set: (val) => val.replace(/[<>]/g, '') 
  },
  isPublic: {
    type: Boolean,
    default: false,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    default: null
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