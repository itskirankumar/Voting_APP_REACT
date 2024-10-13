import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation to signup
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Login.css'; // Custom styles
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons for show/hide password
import axiosInstance from "../Help/AxiosInstance";
const Login = () => {
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to track validation errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation logic
    const newErrors = {};
    if (!aadharCardNumber) {
      newErrors.aadharCardNumber = "Aadhar Card Number is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const loginData = {
      aadharCardNumber,
      password,
    };

    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/user/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userData = response.data.response;
      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("name", userData.name);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("role", userData.role);
      localStorage.setItem("isVoted", userData.isVoted);

      if (response.status === 200) {
        toast.success("Logged in successfully!");
      }
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500); // 1.5 seconds delay
    } catch (error) {
      console.log("error is ", error);
      toast.error(
        error.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="form-container">
          <div className="form-group mb-3">
            <label htmlFor="aadharCardNumber">Aadhar Card Number</label>
            <input
              type="text"
              className={`form-control ${errors.aadharCardNumber ? 'is-invalid' : ''}`}
              id="aadharCardNumber"
              placeholder="Enter Aadhar Card Number"
              value={aadharCardNumber}
              onChange={(e) => setAadharCardNumber(e.target.value)}
              required
            />
            {errors.aadharCardNumber && <div className="invalid-feedback">Aadhar Card Number is required</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <div className="invalid-feedback">Password is required</div>}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
