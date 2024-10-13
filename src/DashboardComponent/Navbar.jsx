import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import logo from "../assets/ECLogo.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("isVoted");

    toast.success("Logged out successfully!");

    // Delay navigation to ensure the toast is visible for a moment
    setTimeout(() => {
      window.location.href = "/login";
    }, 500); // 1 seconds delay (adjust as needed)
  };

  const handleVotingClick = () => {
    window.location.href = "/"; // This will navigate to the voting page and refresh
    // or you can use window.location.reload(); to refresh the current page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "80px" }}>
      <div className="container-fluid">
        {/* Brand and Nav Links */}
        <img src={logo} height="70px" width="100px" className="nav-logo" alt="" />
        <h5 className="Logo-Title-name">ELECTION COMMISSION OF INDIA</h5>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link" onClick={handleVotingClick} style={{ cursor: "pointer" }}>
                Voting
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/electionResult">
                Election Result
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              {role === "admin" ? (
                <Link className="nav-link" to="/adminDashboard">
                  Admin
                </Link>
              ) : (
                <Link className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign up
              </Link>
            </li>
          </ul>
        </div>

        {/* User Info Section - Top Right */}
        {token && (
          <div
            className="nav-item user-info d-flex align-items-center position-relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaUserCircle size={35} className="me-2 user-icon" />
            <div className="user-details">
              <span className="user-name">{name}</span>
              <br />
              <span className="user-email">{email}</span>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="dropdown-menu show">
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
                <Link className="dropdown-item" to="/changePassword">
                  Change Password
                </Link>
                <Link className="dropdown-item" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
