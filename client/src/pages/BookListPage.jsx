import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const apiBaseUrl = process.env.REACT_APP_BACKEND_URL;

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/books`)  // Assuming your backend API endpoint is /api/books
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch books');
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  if (loading)
    return (
      <p style={{ textAlign: 'center', marginTop: 50, fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
        Loading books...
      </p>
    );

  if (error)
    return (
      <p style={{ textAlign: 'center', marginTop: 50, color: '#ff4d4d', fontWeight: 'bold', fontSize: 18 }}>
        Error: {error}
      </p>
    );

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px 60px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: 'linear-gradient(135deg, #f9f7fd 0%, #e4f0fd 40%, #a4c4ff 100%)', borderRadius: 15, boxShadow: '0 10px 40px rgba(50, 80, 180, 0.15)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30, color: '#264de4', textTransform: 'uppercase', letterSpacing: 3, fontWeight: '900', textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>
        Book Listing
      </h1>

      <input
        type="text"
        placeholder="Search books by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          display: 'block',
          margin: '0 auto 40px auto',
          padding: '14px 24px',
          width: '320px',
          borderRadius: 50,
          border: '3px solid #264de4',
          fontSize: 18,
          fontWeight: '600',
          color: '#264de4',
          outline: 'none',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(38, 77, 228, 0.25)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#1b35b8';
          e.currentTarget.style.boxShadow = '0 6px 18px rgba(27, 53, 184, 0.45)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#264de4';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(38, 77, 228, 0.25)';
        }}
      />

      {filteredBooks.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: 20, color: '#264de4', fontWeight: '600' }}>
          No books found.
        </p>
      ) : (
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 30, listStyle: 'none', padding: 0 }}>
          {filteredBooks.map((book) => (
            <li
              key={book._id || book.id}
              style={{
                borderRadius: 20,
                background: 'white',
                boxShadow: '0 8px 25px rgba(38, 77, 228, 0.15), 0 0 15px rgba(38, 77, 228, 0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                cursor: 'pointer',
                border: '3px solid transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(38, 77, 228, 0.3), 0 0 25px rgba(38, 77, 228, 0.25)';
                e.currentTarget.style.borderColor = '#264de4';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(38, 77, 228, 0.15), 0 0 15px rgba(38, 77, 228, 0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <Link to={`/books/${book._id || book.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                <img
                  src={`/${book.image}`} // Assuming book.image is a path like "/uploads/book1.jpg"
                  alt={book.title}
                  style={{ width: '100%', height: 320, objectFit: 'cover', filter: 'drop-shadow(0 0 8px rgba(38, 77, 228, 0.2))' }}
                />
                <div style={{ padding: '18px 25px' }}>
                  <h3 style={{ margin: '10px 0 6px 0', fontSize: '1.4rem', color: '#264de4', fontWeight: '700' }}>{book.title}</h3>
                  <p style={{ margin: 0, color: '#556699', fontSize: 16, fontWeight: '500' }}>by {book.author}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

