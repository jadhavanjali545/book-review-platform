const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // Must link to a book
  user: { type: String, required: true },         // User who wrote the review (could be user ID or name)
  comment: { type: String, required: true },      // Review comment required
  rating: { type: Number, required: true, min: 0, max: 5 },  // Rating between 0 and 5 required
}, { timestamps: true });                          // Tracks createdAt & updatedAt

module.exports = mongoose.model('Review', reviewSchema);
