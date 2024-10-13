import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // For notifications
import { useNavigate, Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import "./CandidateList.css"; // Import custom CSS
import axiosInstance from "../Help/AxiosInstance";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the candidate list on component mount
    const fetchCandidates = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/candidate/listCandidates"
        );
        setCandidates(response.data);
      } catch (error) {
        toast.error("Failed to fetch candidates");
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (candidateId) => {
    try {
      await axios.delete(`http://localhost:3000/candidate/${candidateId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token
        },
      });
      toast.success("Candidate deleted successfully!");
      setCandidates(
        candidates.filter((candidate) => candidate._id !== candidateId)
      );
    } catch (error) {
      toast.error("Failed to delete candidate");
      console.error("Error deleting candidate:", error);
    }
  };

  const handleEdit = (candidateId) => {
    navigate(`/adminDashboard/candidateUpdate/${candidateId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Candidate List</h2>
      <table className="table table-striped mt-4">
        <thead>
          <Link to="/adminDashboard/candidate" className="addCandidate">
            Add Candidate
          </Link>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Age</th>
            <th>Vote Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              <td>{candidate.age}</td>
              <td>{candidate.voteCount}</td>
              <td>
                <button
                  onClick={() => handleEdit(candidate._id)}
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDelete(candidate._id)}
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
