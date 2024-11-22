import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";

function App() {
  // Example authentication state (usually fetched from an API or context)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Optionally, check for a token or session info in localStorage/sessionStorage
  useEffect(() => {
    // Check if a user is logged in based on some logic
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={isLoggedIn || localStorage.getItem('user') ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
