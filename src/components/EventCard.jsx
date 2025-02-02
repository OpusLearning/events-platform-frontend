import React from 'react';

const EventCard = ({ event, onSignUpSuccess }) => {
  const handleSignUp = () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('Please log in to sign up for an event.');
      return;
    }
    // Example sign-up functionality; adjust API call as needed
    fetch('/api/events/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ eventId: event.id }),
    })
      .then(res => res.json())
      .then(data => {
        alert('Signed up successfully!');
        if (onSignUpSuccess) onSignUpSuccess(event);
      })
      .catch(err => {
        console.error('Sign up failed:', err);
        alert('Failed to sign up for event.');
      });
  };

  const handleAddToCalendar = () => {
    const proceed = window.confirm(
      'Beta Feature: The "Add to Google Calendar" functionality is currently in beta. You must be on our Google Cloud whitelist for this feature to work. Please contact james.william.wallace@gmail.com for details. Do you want to proceed?'
    );
    if (proceed) {
      window.location.href = '/api/calendar/auth';
    }
  };

  return (
    <div className="card h-100">
      {event.imageUrl ? (
        <img src={event.imageUrl} className="card-img-top" alt={event.title} />
      ) : (
        <img src="/placeholder-image.jpg" className="card-img-top" alt="Placeholder" />
      )}
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">
          {new Date(event.date).toLocaleDateString()} - {event.location}
        </p>
        <button className="btn btn-primary me-2" onClick={handleSignUp}>
          Sign Up
        </button>
        <button className="btn btn-success" onClick={handleAddToCalendar}>
          Add to Google Calendar
        </button>
      </div>
    </div>
  );
};

export default EventCard;
