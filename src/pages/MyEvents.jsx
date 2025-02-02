// src/pages/MyEvents.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('userToken');

  const fetchMyEvents = () => {
    axios.get('/api/events/signedup', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setMyEvents(response.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching your events:", err);
      setError('Failed to fetch your events.');
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!token) {
      setError('Not authenticated. Please log in.');
      setLoading(false);
      return;
    }
    fetchMyEvents();
  }, [token]);

  const handleCancelRegistration = (eventId) => {
    axios.delete(`/api/events/signup/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      alert(response.data.message || 'Registration cancelled successfully.');
      fetchMyEvents(); // Refresh the list after deletion
    })
    .catch(err => {
      console.error("Error cancelling registration:", err);
      alert('Failed to cancel registration.');
    });
  };

  if (loading) return <p>Loading your events...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>My Registered Events</h2>
      {myEvents.length > 0 ? (
        <ul className="list-group">
          {myEvents.map(event => (
            <li key={event.id} className="list-group-item d-flex align-items-center">
              <div>
                {event.imageUrl ? (
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    style={{ width: '100px', height: 'auto', marginRight: '15px' }} 
                  />
                ) : (
                  <img 
                    src="/placeholder-image.jpg" 
                    alt="Placeholder" 
                    style={{ width: '100px', height: 'auto', marginRight: '15px' }} 
                  />
                )}
              </div>
              <div className="flex-grow-1">
                <strong>{event.title}</strong><br />
                {new Date(event.date).toLocaleDateString()} - {event.location}
              </div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => handleCancelRegistration(event.id)}
              >
                Cancel Registration
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't signed up for any events yet.</p>
      )}
    </div>
  );
};

export default MyEvents;
