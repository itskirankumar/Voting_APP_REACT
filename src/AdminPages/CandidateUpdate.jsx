import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // For notifications
import { useNavigate, useParams } from "react-router-dom";
import "./Candidate.css"; // Custom CSS for further styling
import axiosInstance from "../Help/AxiosInstance";
const CandidateUpdate = () => {
  const { id } = useParams(); // Get candidate ID from the URL params
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch candidate data by ID when component loads
    const fetchCandidate = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`http://localhost:3000/candidate/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });

        if (response.status === 200) {
          const { name, party, age } = response.data; // Destructure the candidate data
          setName(name);
          setParty(party);
          setAge(age);
        }
      } catch (error) {
        toast.error("Failed to fetch candidate details");
        console.error("Error fetching candidate:", error);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Prepare updated candidate data
    const updatedCandidateData = {
      name,
      party,
      age: Number(age), // Ensure age is sent as a number
    };

    try {
      const response = await axios.put(`http://localhost:3000/candidate/${id}`, updatedCandidateData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
          "Content-Type": "application/json",
        },
      });

      // Handle success
      if (response.status === 200) {
        toast.success("Candidate updated successfully!");
        navigate("/adminDashboard/candidateList"); // Redirect to candidates list or some other page
      }
    } catch (error) {
      // Handle errors
      toast.error("Failed to update candidate");
      console.error("Error updating candidate:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow-lg p-4" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Update Candidate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Candidate Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="party" className="form-label">
              Party
            </label>
            <input
              type="text"
              className="form-control"
              id="party"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Update Candidate
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateUpdate;
