// src/pages/DetailedStatistics.jsx
import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { statisticsApi } from '../api/statisticsApi';

const DetailedStatistics = () => {
    const [activeTab, setActiveTab] = useState('daily'); // 'daily', 'weekly', 'monthly'
    const [dailyDate, setDailyDate] = useState(formatDateForInput(new Date()));
    const [weeklyStartDate, setWeeklyStartDate] = useState(formatDateForInput(getStartOfWeek()));
    const [monthYear, setMonthYear] = useState(formatYearMonthForInput(new Date()));
    const [revenue, setRevenue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function getStartOfWeek() {
        const today = new Date();
        const day = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
        const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
        return new Date(today.setDate(diff));
    }

    function formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    function formatYearMonthForInput(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setRevenue(null);
        setError(null);
    };

    const handleDailyDateChange = (e) => {
        setDailyDate(e.target.value);
    };

    const handleWeeklyStartDateChange = (e) => {
        setWeeklyStartDate(e.target.value);
    };

    const handleMonthYearChange = (e) => {
        setMonthYear(e.target.value);
    };

    const fetchDailyRevenue = async () => {
        try {
            setLoading(true);
            const data = await statisticsApi.getDailyRevenue(dailyDate);
            setRevenue(data);
            setError(null);
        } catch (err) {
            setError('Failed to load daily revenue. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeeklyRevenue = async () => {
        try {
            setLoading(true);
            const data = await statisticsApi.getWeeklyRevenue(weeklyStartDate);
            setRevenue(data);
            setError(null);
        } catch (err) {
            setError('Failed to load weekly revenue. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMonthlyRevenue = async () => {
        try {
            setLoading(true);
            const [year, month] = monthYear.split('-').map(Number);
            const data = await statisticsApi.getMonthlyRevenue(year, month);
            setRevenue(data);
            setError(null);
        } catch (err) {
            setError('Failed to load monthly revenue. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (activeTab === 'daily') {
            fetchDailyRevenue();
        } else if (activeTab === 'weekly') {
            fetchWeeklyRevenue();
        } else if (activeTab === 'monthly') {
            fetchMonthlyRevenue();
        }
    };

    // Format revenue as currency
    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return '';

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <Layout>
            <div className="detailed-statistics">
                <h1>Detailed Revenue Statistics</h1>

                <div className="stats-tabs">
                    <button
                        className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
                        onClick={() => handleTabChange('daily')}
                    >
                        Daily Revenue
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
                        onClick={() => handleTabChange('weekly')}
                    >
                        Weekly Revenue
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'monthly' ? 'active' : ''}`}
                        onClick={() => handleTabChange('monthly')}
                    >
                        Monthly Revenue
                    </button>
                </div>

                <div className="stats-content">
                    {activeTab === 'daily' && (
                        <form onSubmit={handleSubmit} className="stats-form">
                            <div className="form-group">
                                <label htmlFor="daily-date">Select Date:</label>
                                <input
                                    type="date"
                                    id="daily-date"
                                    value={dailyDate}
                                    onChange={handleDailyDateChange}
                                    max={formatDateForInput(new Date())}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">View Revenue</button>
                        </form>
                    )}

                    {activeTab === 'weekly' && (
                        <form onSubmit={handleSubmit} className="stats-form">
                            <div className="form-group">
                                <label htmlFor="weekly-start-date">Week Starting:</label>
                                <input
                                    type="date"
                                    id="weekly-start-date"
                                    value={weeklyStartDate}
                                    onChange={handleWeeklyStartDateChange}
                                    max={formatDateForInput(new Date())}
                                    required
                                />
                                <small className="form-text">Revenue will be calculated for 7 days starting from this date.</small>
                            </div>
                            <button type="submit" className="btn btn-primary">View Revenue</button>
                        </form>
                    )}

                    {activeTab === 'monthly' && (
                        <form onSubmit={handleSubmit} className="stats-form">
                            <div className="form-group">
                                <label htmlFor="month-year">Select Month:</label>
                                <input
                                    type="month"
                                    id="month-year"
                                    value={monthYear}
                                    onChange={handleMonthYearChange}
                                    max={formatYearMonthForInput(new Date())}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">View Revenue</button>
                        </form>
                    )}

                    {loading && <div className="loading">Loading revenue data...</div>}
                    {error && <div className="error-message">{error}</div>}

                    {revenue !== null && !loading && !error && (
                        <div className="revenue-result">
                            <h2>
                                {activeTab === 'daily' && `Daily Revenue (${dailyDate})`}
                                {activeTab === 'weekly' && `Weekly Revenue (${weeklyStartDate} to ${formatDateForInput(new Date(new Date(weeklyStartDate).setDate(new Date(weeklyStartDate).getDate() + 6)))})`}
                                {activeTab === 'monthly' && `Monthly Revenue (${new Date(monthYear).toLocaleString('default', { month: 'long', year: 'numeric' })})`}
                            </h2>
                            <div className="revenue-amount">{formatCurrency(revenue)}</div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default DetailedStatistics;