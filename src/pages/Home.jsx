// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import UserStatus from '../components/UserStatus';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/events')
      .then(response => {
        console.log("API response for events:", response.data);
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else if (response.data.events && Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          setError('Invalid response format for events.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setError('Failed to fetch events.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <UserStatus />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        <div>
          <Link to="/login" className="btn btn-secondary me-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline-primary">
            Register
          </Link>
        </div>
      </div>

      {events.length > 0 ? (
        <div className="row">
          {events.map(event => (
            <div key={event.id} className="col-md-4 mb-4">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default Home;
