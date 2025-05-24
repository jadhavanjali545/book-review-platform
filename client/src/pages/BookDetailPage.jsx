import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <span style={{ color: '#FFD700', fontSize: 18 }}>
      {'★'.repeat(fullStars)}
      {halfStar && '☆'}
      {'☆'.repeat(emptyStars)}
    </span>
  );
}

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    async function fetchBookAndReviews() {
      try {
        const bookRes = await fetch(`http://localhost:5001/api/books/${id}`);
        if (!bookRes.ok) throw new Error('Failed to fetch book');
        const bookData = await bookRes.json();

        const reviewsRes = await fetch(`http://localhost:5001/api/reviews?bookId=${id}`);
        if (!reviewsRes.ok) throw new Error('Failed to fetch reviews');
        const reviewsData = await reviewsRes.json();

        setBook(bookData);
        setReviews(reviewsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchBookAndReviews();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) {
      setFormError('Please fill in both name and comment.');
      return;
    }
    if (rating < 0 || rating > 5) {
      setFormError('Rating must be between 0 and 5.');
      return;
    }
    setFormLoading(true);
    setFormError(null);

    try {
      const res = await fetch('http://localhost:5001/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: id, user: userName, comment, rating }),
      });
      if (!res.ok) throw new Error('Failed to submit review');
      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setUserName('');
      setComment('');
      setRating(5);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  }

  if (loading)
    return (
      <p
        style={{
          textAlign: 'center',
          marginTop: 50,
          fontSize: 20,
          color: '#264de4',
          fontWeight: 'bold',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Loading book details...
      </p>
    );
  if (error)
    return (
      <p
        style={{
          textAlign: 'center',
          marginTop: 50,
          color: '#ff4d4d',
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        Error: {error}
      </p>
    );
  if (!book) return <p>No book found</p>;

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '40px auto',
        padding: '20px 30px 50px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f5f7ff',
        borderRadius: 15,
        boxShadow: '0 10px 30px rgba(38, 77, 228, 0.15)',
      }}
    >
      <h1 style={{ color: '#264de4', marginBottom: 4 }}>{book.title}</h1>
      <p
        style={{
          fontStyle: 'italic',
          fontWeight: '600',
          color: '#556699',
          marginTop: 0,
          marginBottom: 20,
          fontSize: 18,
        }}
      >
        by {book.author}
      </p>

      {/* Book image */}
      <img
        src={`/${book.image}`}
        alt={book.title}
        style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 12, marginBottom: 20 }}
      />

      <p style={{ lineHeight: 1.6, fontSize: 16, color: '#333' }}>{book.description}</p>

      <h2 style={{ marginTop: 40, color: '#264de4' }}>Reviews</h2>
      {reviews.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#888' }}>No reviews yet.</p>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            paddingLeft: 0,
            maxHeight: 300,
            overflowY: 'auto',
            marginTop: 10,
            marginBottom: 40,
          }}
        >
          {reviews.map((review) => (
            <li
              key={review._id || review.id}
              style={{
                backgroundColor: 'white',
                padding: '15px 20px',
                borderRadius: 12,
                marginBottom: 15,
                boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
                borderLeft: '6px solid #264de4',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <strong style={{ color: '#264de4' }}>{review.user || 'Anonymous'}</strong>
                <StarRating rating={review.rating || 0} />
              </div>
              <p style={{ margin: 0, color: '#444', fontSize: 15 }}>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ color: '#264de4' }}>Submit a Review</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: '600', color: '#264de4' }}>
          Your Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={formLoading}
            style={{
              width: '100%',
              padding: 10,
              marginTop: 5,
              borderRadius: 8,
              border: '2px solid #264de4',
              fontSize: 16,
              outline: 'none',
              boxShadow: 'inset 0 2px 5px rgba(38,77,228,0.1)',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#1b35b8')}
            onBlur={(e) => (e.target.style.borderColor = '#264de4')}
          />
        </label>

        <label
          style={{ display: 'block', marginBottom: 8, fontWeight: '600', color: '#264de4', marginTop: 15 }}
        >
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={formLoading}
            rows={5}
            style={{
              width: '100%',
              padding: 10,
              marginTop: 5,
              borderRadius: 8,
              border: '2px solid #264de4',
              fontSize: 16,
              fontFamily: 'inherit',
              outline: 'none',
              resize: 'vertical',
              boxShadow: 'inset 0 2px 5px rgba(38,77,228,0.1)',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#1b35b8')}
            onBlur={(e) => (e.target.style.borderColor = '#264de4')}
          />
        </label>

        <label
          style={{ display: 'block', marginBottom: 8, fontWeight: '600', color: '#264de4', marginTop: 15 }}
        >
          Rating (0 - 5):
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="0"
            max="5"
            disabled={formLoading}
            style={{
              width: '100%',
              padding: 10,
              marginTop: 5,
              borderRadius: 8,
              border: '2px solid #264de4',
              fontSize: 16,
              outline: 'none',
              boxShadow: 'inset 0 2px 5px rgba(38,77,228,0.1)',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#1b35b8')}
            onBlur={(e) => (e.target.style.borderColor = '#264de4')}
          />
        </label>

        {formError && (
          <p
            style={{
              color: '#ff4d4d',
              fontWeight: '600',
              marginTop: 10,
              marginBottom: 0,
            }}
          >
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={formLoading}
          style={{
            marginTop: 20,
            padding: '12px 25px',
            backgroundColor: '#264de4',
            color: 'white',
            border: 'none',
            borderRadius: 50,
            fontSize: 18,
            fontWeight: '700',
            cursor: formLoading ? 'not-allowed' : 'pointer',
            boxShadow: formLoading ? 'none' : '0 6px 15px rgba(38,77,228,0.5)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (!formLoading) e.currentTarget.style.backgroundColor = '#1b35b8';
          }}
          onMouseLeave={(e) => {
            if (!formLoading) e.currentTarget.style.backgroundColor = '#264de4';
          }}
        >
          {formLoading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
