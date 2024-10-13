import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css"; // Import custom CSS for additional styles
import axiosInstance from "../Help/AxiosInstance";
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:3000/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if necessary
          },
        });
        setProfile(response.data.response);
      } catch (error) {
        setError("Failed to fetch profile data.");
        toast.error("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg profile-card" style={{ maxWidth: "900px", width: "100%" }}>
        <h2 className="text-center mb-4">User Profile</h2>
        {profile && (
          <div className="row">
            {[
              { label: "Name", value: profile.name },
              { label: "Age", value: profile.age },
              { label: "Email", value: profile.email },
              { label: "Mobile", value: profile.mobile },
              { label: "Address", value: profile.address },
              { label: "Aadhar Card Number", value: profile.aadharCardNumber },
              { label: "Role", value: profile.role },
              { label: "Has Voted", value: profile.isVoted ? "Yes" : "No" }
            ].map((info, index) => (
              <div className="col-md-6 mb-2" key={index}>
                <div className="profile-info d-flex">
                  <h5>{info.label}:</h5>
                  <p className="ms-2">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
