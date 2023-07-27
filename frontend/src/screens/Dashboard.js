import React from 'react';
import SideBar from '../components/SideBar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="main-content">
      <SideBar />

      <div className="content-wrapper">
        <div className="section-title">
          <h2>Dashboard</h2>
        </div>
        <div className="content-inner">
          <div className="dashboard-content">
            <Link to="/categories">
              <div className="tile">
                <h4>Categories</h4>
              </div>
            </Link>
            <Link to="/products">
              <div className="tile">
                <h4>All Products</h4>
              </div>
            </Link>
            <Link to="/salt">
              <div className="tile">
                <h4>Salt Products</h4>
              </div>
            </Link>
            <Link to="/pasta">
              <div className="tile">
                <h4>Pasta Products</h4>
              </div>
            </Link>
            <Link to="/wheat">
              <div className="tile">
                <h4>Wheat Products</h4>
              </div>
            </Link>
            <Link to="/components">
              <div className="tile">
                <h4>Components</h4>
              </div>
            </Link>
            <Link to="/contacts">
              <div className="tile">
                <h4>Contacts</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
