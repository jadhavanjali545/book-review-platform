import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import UserListPage from './pages/userListPage'; // Adjust the path based on your folder structure


function App() {
  return (
    <Router>
      {/* HEADER HERE */}
      <header style={{ padding: '10px', backgroundColor: '#333', color: 'white', textAlign: 'center' }}>
        <img src="/project01.jpg" alt="Site Logo" style={{ width: '50px', verticalAlign: 'middle' }} />
        <h1 style={{ display: 'inline', marginLeft: '10px' }}>Book Review Platform</h1>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/profile/:id" element={<UserProfilePage />} />
        <Route path="/users" element={<UserListPage />} />

      </Routes>
    </Router>
  );
}

export default App;




