const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },           // Name is required
  email: { type: String, required: true, unique: true }, // Email required and unique
  bio: String,
}, { timestamps: true });                            // Track creation and update times

module.exports = mongoose.model('User', userSchema);
