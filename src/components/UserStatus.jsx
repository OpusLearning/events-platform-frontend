// src/components/UserStatus.jsx
import React from 'react';
import * as jwtDecodeModule from 'jwt-decode';

// Use the default export if it exists, otherwise fall back to the entire module
const jwt_decode = (jwtDecodeModule && jwtDecodeModule.default) || jwtDecodeModule;

const UserStatus = () => {
  const token = localStorage.getItem('userToken');

  if (!token) {
    return <p className="text-muted">Not logged in</p>;
  }

  try {
    const decoded = jwt_decode(token);
    console.log("Decoded token:", decoded);
    // If no name or email is provided, fall back to using the user's ID.
    const username = decoded.name || decoded.email || `User #${decoded.id}`;
    const role = decoded.role || 'User';

    return (
      <div className="alert alert-info py-2 my-2">
        Logged in as: <strong>{username}</strong> (<strong>{role}</strong>)
      </div>
    );
  } catch (error) {
    console.error('Error decoding token:', error);
    return <p className="text-danger">Error determining login status.</p>;
  }
};

export default UserStatus;
