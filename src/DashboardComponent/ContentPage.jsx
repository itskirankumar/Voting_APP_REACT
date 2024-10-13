import React from 'react';
import { Outlet } from 'react-router-dom';

const ContentPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Outlet /> {/* Renders the nested routes content */}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
