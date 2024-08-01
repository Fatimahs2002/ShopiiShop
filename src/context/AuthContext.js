// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/auth', { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  const login = async (email, password) => {
    await axios.post('/api/login', { email, password }, { withCredentials: true });
    const response = await axios.get('/api/auth', { withCredentials: true });
    setUser(response.data);
  };

  const logout = async () => {
    await axios.post('/api/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
