// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { statisticsApi } from '../api/statisticsApi';

const Dashboard = () => {
    const [stats, setStats] = useState({
        todayRevenue: 0,
        weeklyRevenue: 0,
        topSellingItems: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                setLoading(true);
                const data = await statisticsApi.getDashboardStats();
                setStats(data);
                setError(null);
            } catch (err) {
                console.error("Failed to load dashboard statistics:", err);
                // We don't set error state here to avoid showing error on the dashboard
                // Just use default values
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    // Helper function to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <Layout>
            <div className="dashboard-container">
                <h1>Dashboard</h1>

                <div className="dashboard-summary">
                    <div className="summary-card">
                        <h3>Menu Items</h3>
                        <p className="summary-number">25</p>
                        <p className="summary-link">
                            <Link to="/menu-items">Manage Menu</Link>
                        </p>
                    </div>

                    <div className="summary-card">
                        <h3>Categories</h3>
                        <p className="summary-number">6</p>
                        <p className="summary-link">
                            <Link to="/categories">Manage Categories</Link>
                        </p>
                    </div>

                    <div className="summary-card">
                        <h3>Today's Orders</h3>
                        <p className="summary-number">12</p>
                        <p className="summary-link">
                            <Link to="/orders">View Orders</Link>
                        </p>
                    </div>

                    <div className="summary-card">
                        <h3>Today's Revenue</h3>
                        <p className="summary-number">{formatCurrency(stats.todayRevenue || 0)}</p>
                        <p className="summary-link">
                            <Link to="/statistics">View Statistics</Link>
                        </p>
                    </div>
                </div>

                <div className="dashboard-analytics">
                    <div className="analytics-card">
                        <h3>Weekly Revenue</h3>
                        <p className="summary-number">{formatCurrency(stats.weeklyRevenue || 0)}</p>
                        <p className="period-label">Last 7 days</p>
                        <p className="summary-link">
                            <Link to="/statistics/detailed">View Detailed Statistics</Link>
                        </p>
                    </div>

                    <div className="analytics-card">
                        <h3>Top Selling Items</h3>
                        {loading ? (
                            <p>Loading top items...</p>
                        ) : (
                            <ul className="top-items-list">
                                {(stats.topSellingItems || []).slice(0, 3).map((item, index) => (
                                    <li key={index} className="top-item">
                                        <span className="top-item-name">{item.name}</span>
                                        <span className="top-item-quantity">{item.quantity} sold</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <p className="summary-link">
                            <Link to="/statistics">View All Top Items</Link>
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