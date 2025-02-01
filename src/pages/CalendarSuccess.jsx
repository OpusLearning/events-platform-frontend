// src/pages/CalendarSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CalendarSuccess = () => {
  return (
    <div className="container text-center mt-5">
      <h2 className="mb-3">Google Calendar Authentication Successful!</h2>
      <p>Your Google Calendar is now connected, and you can add events.</p>
      <div className="alert alert-warning mt-4" role="alert">
        <strong>Beta Feature:</strong> The "Add to Google Calendar" functionality is currently in beta.
        You must be on our Google Cloud whitelist for this feature to work.
        Please contact <a href="mailto:james.william.wallace@gmail.com" className="alert-link">james.william.wallace@gmail.com</a> for details.
      </div>
      <Link to="/" className="btn btn-primary mt-3">
        Return to Home
      </Link>
    </div>
  );
};

export default CalendarSuccess;
