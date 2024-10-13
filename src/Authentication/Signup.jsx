import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; // Import custom CSS for additional styles
import axiosInstance from "../Help/AxiosInstance";

const Signup = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number()
      .min(1, "Age must be a positive number")
      .required("Age is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    mobile: Yup.string()
      .length(10, "Mobile must be 10 digits")
      .required("Mobile is required"),
    address: Yup.string().required("Address is required"),
    aadharCardNumber: Yup.string()
      .length(12, "Aadhar Card Number must be 12 digits")
      .required("Aadhar Card Number is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/user/signup",
        data
      );
      toast.success("Signup successful");
      const userData = response.data.response;
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("name", userData.name);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("role", userData.role);
      localStorage.setItem("isVoted", userData.isVoted);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup failed");
    }
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow-lg" style={{ width: "100%" }}>
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-lg-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                {...register("name")}
              />
            </div>

            <div className="col-lg-4">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                id="age"
                {...register("age")}
              />
            </div>

            <div className="col-lg-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                {...register("email")}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-4">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                id="mobile"
                {...register("mobile")}
              />
            </div>

            <div className="col-lg-4">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                id="address"
                {...register("address")}
              />
            </div>

            <div className="col-lg-4">
              <label htmlFor="aadharCardNumber" className="form-label">
                Aadhar Card Number
              </label>
              <input
                type="text"
                className={`form-control ${errors.aadharCardNumber ? "is-invalid" : ""}`}
                id="aadharCardNumber"
                {...register("aadharCardNumber")}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                {...register("password")}
              />
            </div>

            <div className="col-lg-4">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className={`form-select ${errors.role ? "is-invalid" : ""}`}
                id="role"
                {...register("role")}
              >
                <option value="">Select Role</option>
                <option value="voter">Voter</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="col-lg-4">
              <br /> <br />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isVoted"
                  {...register("isVoted")}
                />
                <label className="form-check-label" htmlFor="isVoted">
                  Has Voted
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
          <br /> <br />
          <p>
            Already Registered?{" "}
            <Link to="/login" className="signup-link">
              <i>Login</i>
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
