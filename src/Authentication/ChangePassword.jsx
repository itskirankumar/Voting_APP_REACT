import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './ChangePassword.css'; // Import your CSS for styling

const ChangePassword = () => {
  const token=localStorage.getItem('token');
  console.log('Token from localStorage:', token);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const response = await axios.put('http://localhost:3000/user/profile/password', {
        currentPassword,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Password Changed Successfully");
      // Optionally, you can redirect the user or clear the form
    } catch (error) {
      toast.error(error.response?.data?.error || "Error changing password");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form className="change-password-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"  
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleSubmit}>Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
