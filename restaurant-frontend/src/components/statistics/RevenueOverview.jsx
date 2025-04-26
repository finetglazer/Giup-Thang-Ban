// src/components/statistics/RevenueOverview.jsx
import React, { useState, useEffect } from 'react';
import { statisticsApi } from '../../api/statisticsApi';

const RevenueOverview = () => {
    const [stats, setStats] = useState({
        todayRevenue: 0,
        yesterdayRevenue: 0,
        weeklyRevenue: 0,
        monthlyRevenue: 0,
        dailyGrowth: 0
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
                setError('Failed to load dashboard statistics. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    // Helper function to format number as currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (loading) return <div className="loading">Loading statistics...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="revenue-overview">
            <div className="overview-header">
                <h2>Revenue Overview</h2>
            </div>

            <div className="overview-grid">
                <div className="overview-card">
                    <div className="card-content">
                        <h3>Today's Revenue</h3>
                        <div className="revenue-amount">{formatCurrency(stats.todayRevenue)}</div>
                        <div className={`growth-indicator ${stats.dailyGrowth >= 0 ? 'positive' : 'negative'}`}>
                            <span className="growth-arrow">
                                {stats.dailyGrowth >= 0 ? '↑' : '↓'}
                            </span>
                            <span className="growth-value">
                                {Math.abs(stats.dailyGrowth).toFixed(1)}% from yesterday
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overview-card">
                    <div className="card-content">
                        <h3>Yesterday's Revenue</h3>
                        <div className="revenue-amount">{formatCurrency(stats.yesterdayRevenue)}</div>
                    </div>
                </div>

                <div className="overview-card">
                    <div className="card-content">
                        <h3>Weekly Revenue</h3>
                        <div className="revenue-amount">{formatCurrency(stats.weeklyRevenue)}</div>
                        <div className="period-label">Last 7 days</div>
                    </div>
                </div>

                <div className="overview-card">
                    <div className="card-content">
                        <h3>Monthly Revenue</h3>
                        <div className="revenue-amount">{formatCurrency(stats.monthlyRevenue)}</div>
                        <div className="period-label">Current Month</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueOverview;