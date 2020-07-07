import React, { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  console.log( user, isAuthenticated);
  return (
    <p>Placeholder</p>
  );
}

export default App;
