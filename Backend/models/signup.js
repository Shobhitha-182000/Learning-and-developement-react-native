const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Added username field
  email: { type: String, required: true, unique: true },    // Ensure uniqueness for email
  password: { type: String, required: true }
});

module.exports = mongoose.model('Signup', signupSchema);
