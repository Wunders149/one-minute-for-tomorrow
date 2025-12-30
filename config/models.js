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
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

// Add index for performance on the most common sorting field
wishSchema.index({ createdAt: -1 });

const Wish = mongoose.model('Wish', wishSchema);

module.exports = Wish;