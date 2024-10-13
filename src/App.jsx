import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Candidate from "./AdminPages/Candidate";
import DashboardLayout from "./DashboardComponent/DashboardLayout";
import Navbar from "./DashboardComponent/Navbar";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import Profile from './Components/Profile';
import CandidateUpdate from './AdminPages/CandidateUpdate';
import CandidateList from './AdminPages/CandidateList';
import Home from './Components/Home';
import ElectionResult from './Components/ElectionResult';
import Dashboard from './Components/dashboard';
import ChangePassword from './Authentication/ChangePassword';
import ProtectedRoute from "./ServiceRoutes/ProtectedRoute";
const App = () => {
  const location = useLocation();
  const noNavbarRoutes = ["/signup", "/login",]; // Routes where Navbar should not be shown

  return (
    <div>
      {/* Conditionally render Navbar based on current location */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> {/* Example Home page */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/electionResult" element={<ElectionResult />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* DashboardLayout as the layout route for nested routes */}
        <Route path="/adminDashboard" element={<DashboardLayout />}>
          <Route path="candidate" element={<Candidate />} /> {/* Nested route */}
          <Route path="candidateList" element={<CandidateList />} /> {/* Nested route */}
          <Route path="candidateUpdate/:id" element={<CandidateUpdate />} /> {/* Nested route */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
