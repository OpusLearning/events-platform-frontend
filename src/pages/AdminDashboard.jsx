// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import UserStatus from '../components/UserStatus';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEventId, setEditingEventId] = useState(null);
  // For editing, we store date as a Date object
  const [editingEventData, setEditingEventData] = useState({
    title: '',
    date: new Date(),
    location: '',
    imageUrl: '',
  });
  // For creating events, manage a separate DatePicker state
  const [createDate, setCreateDate] = useState(new Date());
  const token = localStorage.getItem('userToken');
  const navigate = useNavigate();

  // Fetch events from the backend
  const fetchEvents = () => {
    setLoading(true);
    axios
      .get('/api/events', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
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

  // Create event handler using the createDate state for the date picker
  const handleCreateEvent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEvent = {
      title: formData.get('title'),
      date: createDate.toISOString(), // Convert Date object to ISO string
      location: formData.get('location'),
      imageUrl: formData.get('imageUrl') || null,
    };

    axios
      .post('/api/events', newEvent, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        alert('Event created successfully!');
        e.target.reset();
        setCreateDate(new Date());
        fetchEvents();
      })
      .catch((err) => {
        console.error('Error creating event:', err);
        if (err.response && err.response.status === 403) {
          alert('Please log in as admin.');
        } else {
          alert('Failed to create event.');
        }
      });
  };

  // Delete event handler
  const handleDelete = (id) => {
    axios
      .delete(`/api/events/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert('Event deleted successfully.');
        fetchEvents();
      })
      .catch((err) => {
        console.error('Error deleting event:', err);
        if (err.response && err.response.status === 403) {
          alert('Please log in as admin.');
        } else {
          alert('Failed to delete event.');
        }
      });
  };

  // Start editing an event – convert event.date to a Date object
  const startEditing = (event) => {
    setEditingEventId(event.id);
    setEditingEventData({
      title: event.title,
      date: new Date(event.date),
      location: event.location,
      imageUrl: event.imageUrl || '',
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingEventId(null);
    setEditingEventData({ title: '', date: new Date(), location: '', imageUrl: '' });
  };

  // Save the edited event using PUT
  const handleSaveEdit = (e, id) => {
    e.preventDefault();
    // Prepare updated event data (convert date to ISO string)
    const updatedEvent = {
      ...editingEventData,
      date: editingEventData.date.toISOString(),
    };
    axios
      .put(`/api/events/${id}`, updatedEvent, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        alert('Event updated successfully!');
        setEditingEventId(null);
        setEditingEventData({ title: '', date: new Date(), location: '', imageUrl: '' });
        fetchEvents();
      })
      .catch((err) => {
        console.error('Error updating event:', err);
        if (err.response && err.response.status === 403) {
          alert('Please log in as admin.');
        } else {
          alert('Failed to update event.');
        }
      });
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <UserStatus />
      <div className="d-flex justify-content-between align-items-center mb-4">
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
            <label className="form-label">Event Date</label>
            <DatePicker
              selected={createDate}
              onChange={(date) => setCreateDate(date)}
              dateFormat="yyyy-MM-dd"
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
          <div className="mb-3">
            <input
              type="url"
              name="imageUrl"
              className="form-control"
              placeholder="Image URL (optional)"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Event
          </button>
        </form>
      </div>

      <div>
        <h3>Manage Existing Events</h3>
        {events.length > 0 ? (
          <ul className="list-group">
            {events.map((event) => (
              <li key={event.id} className="list-group-item">
                {editingEventId === event.id ? (
                  <form onSubmit={(e) => handleSaveEdit(e, event.id)}>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={editingEventData.title}
                        onChange={(e) =>
                          setEditingEventData({ ...editingEventData, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Event Date</label>
                      <DatePicker
                        selected={editingEventData.date}
                        onChange={(date) =>
                          setEditingEventData({ ...editingEventData, date: date })
                        }
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={editingEventData.location}
                        onChange={(e) =>
                          setEditingEventData({ ...editingEventData, location: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="url"
                        className="form-control"
                        value={editingEventData.imageUrl}
                        onChange={(e) =>
                          setEditingEventData({ ...editingEventData, imageUrl: e.target.value })
                        }
                        placeholder="Image URL (optional)"
                      />
                    </div>
                    <button type="submit" className="btn btn-success btn-sm me-2">
                      Save
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={cancelEditing}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      {event.title} - {new Date(event.date).toLocaleDateString()} at {event.location}
                    </span>
                    <div>
                      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => startEditing(event)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
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
