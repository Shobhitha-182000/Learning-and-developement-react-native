const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true
  },
  percentage: {
    type: Number, 
    required: true,
    min: 0,
    max: 100
  }
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

module.exports = UserProgress;