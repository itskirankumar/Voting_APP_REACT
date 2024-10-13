import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ElectionResult.css'; // Custom CSS file for styles
import axiosInstance from '../Help/AxiosInstance';

const ElectionResult = () => {
  const [voteCounts, setVoteCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3000/candidate/vote/count');
        setVoteCounts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching election results.");
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <p>Loading results...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="result-container">
      <h3>Election Results</h3>
      {voteCounts.length > 0 ? (
        <>
          <p>Leading Party: {voteCounts[0].party}</p>
          <table className="result-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Party</th>
                <th>Vote Count</th>
              </tr>
            </thead>
            <tbody>
              {voteCounts.map((candidate, index) => (
                <tr key={index}>
                  <td>{candidate.name}</td>
                  <td>{candidate.party}</td>
                  <td>{candidate.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No vote data available.</p>
      )}
    </div>
  );
};

export default ElectionResult;
