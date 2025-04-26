// src/components/statistics/RevenueChart.jsx
import React, { useState, useEffect } from 'react';
import { statisticsApi } from '../../api/statisticsApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
    const [chartData, setChartData] = useState([]);
    const [dateRange, setDateRange] = useState('week'); // 'week', 'month', 'custom'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Set default dates based on dateRange
        const today = new Date();

        if (dateRange === 'week') {
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(today.getDate() - 6);
            setStartDate(formatDateForInput(sevenDaysAgo));
            setEndDate(formatDateForInput(today));
        } else if (dateRange === 'month') {
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(today.getDate() - 29);
            setStartDate(formatDateForInput(thirtyDaysAgo));
            setEndDate(formatDateForInput(today));
        }
    }, [dateRange]);

    useEffect(() => {
        if (startDate && endDate) {
            fetchChartData();
        }
    }, [startDate, endDate]);

    const fetchChartData = async () => {
        try {
            setLoading(true);
            const data = await statisticsApi.getDailyRevenueRange(startDate, endDate);

            // Transform data for chart
            const formattedData = data.map(item => ({
                date: formatDate(item.date),
                revenue: item.revenue
            }));

            setChartData(formattedData);
            setError(null);
        } catch (err) {
            setError('Failed to load revenue chart data. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Format date for display (e.g., "Jan 15")
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    // Format date for input fields (YYYY-MM-DD)
    const formatDateForInput = (date) => {
        return date.toISOString().split('T')[0];
    };

    const handleDateRangeChange = (e) => {
        setDateRange(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleCustomRangeSubmit = (e) => {
        e.preventDefault();

        // Validate dates
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            setError('Start date cannot be after end date');
            return;
        }

        // Set dateRange to 'custom' and fetch data
        setDateRange('custom');
        fetchChartData();
    };

    if (loading && chartData.length === 0) return <div className="loading">Loading chart data...</div>;

    return (
        <div className="revenue-chart-container">
            <div className="chart-header">
                <h2>Revenue Trend</h2>

                <div className="chart-controls">
                    <div className="range-selector">
                        <select
                            value={dateRange}
                            onChange={handleDateRangeChange}
                            className="range-select"
                        >
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>

                    {dateRange === 'custom' && (
                        <form onSubmit={handleCustomRangeSubmit} className="custom-range-form">
                            <div className="date-input-group">
                                <label>
                                    From:
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        required
                                    />
                                </label>

                                <label>
                                    To:
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        required
                                    />
                                </label>

                                <button type="submit" className="btn btn-secondary">Apply</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#1976d2"
                            activeDot={{ r: 8 }}
                            name="Revenue"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;