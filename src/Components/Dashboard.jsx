import React from 'react';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
    
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Election Dashboard</h1>
      
      <div className="info-card">
        <h2>What is an Election?</h2>
        <p>
          An election is a formal decision-making process by which a population chooses an individual to hold public office. Elections are the cornerstone of democracy, allowing citizens to participate in their government. 
        </p>
      </div>
      
      <div className="info-card">
        <h2>Key Dates</h2>
        <ul>
          <li><strong>Registration Deadline:</strong> October 15, 2024</li>
          <li><strong>Election Day:</strong> November 5, 2024</li>
          <li><strong>Early Voting:</strong> October 25 - November 2, 2024</li>
        </ul>
      </div>
      
      <div className="info-card">
        <h2>Voting Methods</h2>
        <p>
          Voters can cast their ballots in several ways: 
        </p>
        <ul>
          <li>In-person on Election Day</li>
          <li>During early voting periods</li>
          <li>By mail using absentee ballots</li>
        </ul>
        <p>
          Ensure you check the rules in your state.
        </p>
      </div>
      
      <div className="info-card">
        <h2>Get Informed</h2>
        <p>
          Stay informed about the candidates and measures on your ballot. Research their positions and how they align with your values. 
        </p>
      </div>

      <div className="info-card">
        <h2>Important Resources</h2>
        <ul>
          <li><a href="https://www.nass.org/can-I-vote" target="_blank" rel="noopener noreferrer">Find Your State Election Office</a></li>
          <li><a href="https://www.vote.org/" target="_blank" rel="noopener noreferrer">Vote.org - Check Registration</a></li>
          <li><a href="https://www.ballotpedia.org/" target="_blank" rel="noopener noreferrer">Ballotpedia - Candidate Information</a></li>
        </ul>
      </div>
      
      <div className="info-card">
        <h2>Contact Information</h2>
        <p>If you have questions, please contact your local election office:</p>
        <ul>
          <li><strong>Phone:</strong> (555) 123-4567</li>
          <li><strong>Email:</strong> support@electioninfo.com</li>
        </ul>
      </div>
      
    </div>
  );
};

export default Dashboard;
