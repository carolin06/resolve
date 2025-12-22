import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/temp';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import ComplaintList from './pages/ComplaintList';
import ProtectedRoute from './components/ProtectedRoute';
import StaffDashboard from './pages/StaffDashboard';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/submit-complaint" element={<ProtectedRoute><SubmitComplaint /></ProtectedRoute>} />
        <Route path="/complaints" element={<ProtectedRoute><ComplaintList /></ProtectedRoute>} />
        <Route path="/staff" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
