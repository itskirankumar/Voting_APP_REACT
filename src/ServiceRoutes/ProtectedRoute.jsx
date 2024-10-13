import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for programmatic navigation
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.warning("Please login to access this page");
      setTimeout(() => {
        navigate("/login"); // Delayed navigation to give time for the toast to appear
      }, 1000); // Adjust the delay time as needed
    }
  }, [token, navigate]);

  if (token) {
    return <>{children}</>;
  }

  return null; // While redirecting, return null or any loading component
};

export default ProtectedRoute;
