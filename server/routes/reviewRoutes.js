const express = require('express');
const router = express.Router();
const { getReviews, postReview } = require('../controllers/reviewController');

router.get('/', getReviews); // ?bookId=
router.post('/', postReview);

module.exports = router;

