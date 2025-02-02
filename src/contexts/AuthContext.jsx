// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('userToken'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('userToken', token);
      // Optionally decode token or fetch user data here
    } else {
      localStorage.removeItem('userToken');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
