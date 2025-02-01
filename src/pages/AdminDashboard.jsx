import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '' });
  const token = localStorage.getItem('userToken');

  useEffect(() => {
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
  }, [token]);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    axios.post('/api/events', newEvent, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setEvents(prev => [...prev, response.data.event]);
        setNewEvent({ title: '', date: '', location: '' });
        alert('Event created successfully!');
      })
      .catch(err => {
        console.error("Error creating event:", err);
        alert('Failed to create event.');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setEvents(prev => prev.filter(event => event.id !== id));
        alert('Event deleted successfully.');
      })
      .catch(err => {
        console.error("Error deleting event:", err);
        alert('Failed to delete event.');
      });
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="mb-4">
        <h3>Create a New Event</h3>
        <form onSubmit={handleCreateEvent}>
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Event Title" 
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              required
            />
          </div>
          <div className="mb-3">
            <input 
              type="date" 
              className="form-control" 
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              required
            />
          </div>
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Location" 
              value={newEvent.location}
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
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
                <span>{event.title} - {new Date(event.date).toLocaleDateString()} at {event.location}</span>
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
