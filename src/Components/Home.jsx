import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Home.css"; // Custom CSS for additional styling
import { toast } from "react-toastify";
import axiosInstance from "../Help/AxiosInstance";
const Home = () => {
  const [candidateList, setCandidateList] = useState([]);
  const token = localStorage.getItem("token");
  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/candidate/listCandidates"
      );
      setCandidateList(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };
  const handleVote = async (candidateId) => {
    const role=localStorage.getItem('role');
    if(role==='admin')
    {
      toast.error("Admin have no permission to vote");
      return;
    }
    try {
      const response = await axiosInstance.post(
        `http://localhost:3000/candidate/vote/${candidateId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Vote successfully cast!");

        setTimeout(() => {
          fetchData(); // Refresh data after vote
        }, 1500); // Delay fetching to allow toast to show
      }
    } catch (error) {
      toast.warning("User has already voted");
    }
  };

  return (
    <div className="container mt-4 candidate-container">
      <div className="row">
        <h1 className="text-center mb-4 classic-heading">
          Election Candidates
        </h1>
        {candidateList &&
          candidateList.map((candidate) => (
            <div className="col-lg-4 col-md-6 mb-3" key={candidate._id}>
              <div className="card candidate-card">
                <div className="card-body">
                  <h5 className="card-title">{candidate.name}</h5>
                  <p className="card-text">
                    <strong>Party:</strong> {candidate.party} <br />
                    {/* <strong>Age:</strong> {candidate.age} <br /> */}
                    {/* <strong>Votes:</strong> {candidate.voteCount} */}
                  </p>
                  <button
                    className="btn btn-vote"
                    onClick={() => handleVote(candidate._id)}
                  >
                    Vote
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
