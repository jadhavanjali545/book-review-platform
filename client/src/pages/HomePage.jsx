import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        color: '#fff',
        textAlign: 'center',
        padding: '40px 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        Welcome to Book Reviews
      </h1>
      <p style={{ fontSize: '1.3rem', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.6' }}>
        Discover your next favorite book, explore reviews, and share your thoughts with fellow readers.
      </p>
      <Link
        to="/books"
        style={{
          backgroundColor: '#fff',
          color: '#3366ff',
          padding: '12px 30px',
          borderRadius: '30px',
          fontWeight: 'bold',
          textDecoration: 'none',
          boxShadow: '0 4px 15px rgba(0, 102, 255, 0.4)',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#3366ff';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#fff';
          e.currentTarget.style.color = '#3366ff';
        }}
      >
        Explore Books
      </Link>
    </div>
  );
}


