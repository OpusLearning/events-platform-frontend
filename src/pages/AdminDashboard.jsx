import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserStatus from '../components/UserStatus';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('userToken');
  const navigate = useNavigate();

  // Function to fetch events
  const fetchEvents = () => {
    setLoading(true);
    axios.get('/api/events', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setError('Failed to fetch events.');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!token) {
      setError('Not authenticated. Please log in.');
      setLoading(false);
      return;
    }
    fetchEvents();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEvent = {
      title: formData.get('title'),
      date: formData.get('date'),
      location: formData.get('location'),
    };

    axios.post('/api/events', newEvent, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        alert('Event created successfully!');
        e.target.reset();
        fetchEvents(); // Refresh events list
      })
      .catch(err => {
        console.error("Error creating event:", err);
        if (err.response && err.response.status === 403) {
          alert('Please log in as admin.');
        } else {
          alert('Failed to create event.');
        }
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Event deleted successfully.');
        fetchEvents(); // Refresh events list
      })
      .catch(err => {
        console.error("Error deleting event:", err);
        if (err.response && err.response.status === 403) {
          alert('Please log in as admin.');
        } else {
          alert('Failed to delete event.');
        }
      });
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <UserStatus />
      <div className="d-flex justify-content-between align-items-center">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="mb-4">
        <h3>Create a New Event</h3>
        <form onSubmit={handleCreateEvent}>
          <div className="mb-3">
            <input 
              type="text" 
              name="title"
              className="form-control" 
              placeholder="Event Title" 
              required
            />
          </div>
          <div className="mb-3">
            <input 
              type="date" 
              name="date"
              className="form-control" 
              required
            />
          </div>
          <div className="mb-3">
            <input 
              type="text" 
              name="location"
              className="form-control" 
              placeholder="Location" 
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Event</button>
        </form>
      </div>

      <div>
        <h3>Manage Existing Events</h3>
        {events.length > 0 ? (
          <ul className="list-group">
            {events.map(event => (
              <li key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {event.title} - {new Date(event.date).toLocaleDateString()} at {event.location}
                </span>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
