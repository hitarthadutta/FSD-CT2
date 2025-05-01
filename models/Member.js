const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  year: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  aboutProject: {
    type: String,
    required: true
  },
  hobbies: {
    type: [String],
    default: []
  },
  certificate: {
    type: String,
    required: true,
    trim: true
  },
  internship: {
    type: String,
    required: true,
    trim: true
  },
  aboutAim: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Member', memberSchema); 