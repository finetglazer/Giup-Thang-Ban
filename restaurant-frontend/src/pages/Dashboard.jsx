// src/pages/Dashboard.jsx
import React from 'react';
import Layout from '../components/common/Layout';

const Dashboard = () => {
    return (
        <Layout>
            <div className="dashboard-container">
                <h1>Dashboard</h1>

                <div className="dashboard-summary">
                    <div className="summary-card">
                        <h3>Menu Items</h3>
                        <p className="summary-number">25</p>
                        <p className="summary-link">
                            <a href="/menu-items">Manage Menu</a>
                        </p>
                    </div>

                    <div className="summary-card">
                        <h3>Categories</h3>
                        <p className="summary-number">6</p>
                        <p className="summary-link">
                            <a href="/categories">Manage Categories</a>
                        </p>
                    </div>

                    <div className="summary-card">
                        <h3>Today's Orders</h3>
                        <p className="summary-number">12</p>
                        <p className="summary-link">
                            <a href="/orders">View Orders</a>
                        </p>
                    </div>

                    <div className="summary-card">
                        <h3>Today's Revenue</h3>
                        <p className="summary-number">$720.50</p>
                        <p className="summary-link">
                            <a href="/statistics/daily">View Details</a>
                        </p>
                    </div>
                </div>

                <div className="recent-activity">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <span className="activity-time">10:32 AM</span>
                            <span className="activity-description">New order #1234 created</span>
                        </div>
                        <div className="activity-item">
                            <span className="activity-time">09:15 AM</span>
                            <span className="activity-description">Menu item "Chicken Burger" updated</span>
                        </div>
                        <div className="activity-item">
                            <span className="activity-time">Yesterday</span>
                            <span className="activity-description">New category "Seasonal Specials" added</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;