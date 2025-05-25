import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`)  // check this URL!
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      {/* Additional user info */}
    </div>
  );
}

