import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaCog,
  FaEnvelope,
  FaChartLine,
  FaQuestionCircle,
} from "react-icons/fa";
import ElectioCommissionLogo from "../assets/ECLogo.png";
import AdminLogo from "../assets/AdminLogo.png"
const Sidebar = () => {
  return (
    <div
      className="bg-light border-end vh-100"
      id="sidebar-wrapper"
      style={{ width: "250px" }}
    >
      <div className="sidebar-heading text-center py-1 primary-text fs-4 fw-bold text-uppercase border-bottom">
        <img src={AdminLogo} alt="" height="100px" />
      </div>
      <div className="list-group list-group-flush">
        <Link
          to="/dashboard"
          className="list-group-item list-group-item-action bg-light"
        >
          <FaTachometerAlt className="me-2" /> Dashboard
        </Link>
        <Link
          to="/adminDashboard/candidate"
          className="list-group-item list-group-item-action bg-light"
        >
          <FaUser className="me-2" /> Add Electors
        </Link>
        <Link
          to="/adminDashboard/candidateList"
          className="list-group-item list-group-item-action bg-light"
        >
          <FaUser className="me-2" /> Electors List
        </Link>
        <Link
          to="/login"
          className="list-group-item list-group-item-action bg-light"
        >
          <FaCog className="me-2" /> Logout
        </Link>
        {/* <Link to="/messages" className="list-group-item list-group-item-action bg-light"> */}
        {/* <FaEnvelope className="me-2" /> Messages */}
        {/* </Link> */}
        {/* <Link to="/reports" className="list-group-item list-group-item-action bg-light"> */}
        {/* <FaChartLine className="me-2" /> Reports */}
        {/* </Link> */}
        <Link
          to="/help"
          className="list-group-item list-group-item-action bg-light"
        >
          <FaQuestionCircle className="me-2" /> Help
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
