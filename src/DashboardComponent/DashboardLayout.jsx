import React from 'react';
import Sidebar from './Sidebar';
import ContentPage from './ContentPage';
const DashboardLayout = () => {
  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Page content */}
      <div id="page-content-wrapper" className="w-100">
        <ContentPage />
      </div>
    </div>
  );
};

export default DashboardLayout;
