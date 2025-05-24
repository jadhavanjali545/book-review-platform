const Review = require('../models/Review');

const getReviews = async (req, res) => {
    try {
      const filter = req.query.bookId ? { bookId: req.query.bookId } : {};
      const reviews = await Review.find(filter);
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  };
  

const postReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: 'Failed to submit review' });
  }
};

module.exports = { getReviews, postReview };
