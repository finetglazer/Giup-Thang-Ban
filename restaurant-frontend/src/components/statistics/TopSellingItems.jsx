// src/components/statistics/TopSellingItems.jsx
import React, { useState, useEffect } from 'react';
import { statisticsApi } from '../../api/statisticsApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TopSellingItems = () => {
    const [topItems, setTopItems] = useState([]);
    const [dateRange, setDateRange] = useState('month'); // 'week', 'month', 'custom'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('quantity'); // 'quantity' or 'revenue'

    useEffect(() => {
        // Set default dates based on dateRange
        const today = new Date();

        if (dateRange === 'week') {
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(today.getDate() - 6);
            setStartDate(formatDateForInput(sevenDaysAgo));
            setEndDate(formatDateForInput(today));
        } else if (dateRange === 'month') {
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            setStartDate(formatDateForInput(monthStart));
            setEndDate(formatDateForInput(today));
        }
    }, [dateRange]);

    useEffect(() => {
        if (startDate && endDate) {
            fetchTopItems();
        }
    }, [startDate, endDate]);

    const fetchTopItems = async () => {
        try {
            setLoading(true);
            const data = await statisticsApi.getTopSellingItems(startDate, endDate);
            setTopItems(data);
            setError(null);
        } catch (err) {
            setError('Failed to load top selling items. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
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

    const handleViewChange = (e) => {
        setView(e.target.value);
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
        fetchTopItems();
    };

    // Prepare data for chart
    const prepareChartData = () => {
        if (!topItems || topItems.length === 0) return [];

        // Take top 5 items for better visualization
        return topItems.slice(0, 5).map(item => ({
            name: item.name.length > 15 ? `${item.name.substring(0, 15)}...` : item.name,
            fullName: item.name,
            quantity: item.quantity,
            revenue: item.revenue || 0
        }));
    };

    const chartData = prepareChartData();

    if (loading && topItems.length === 0) return <div className="loading">Loading top items...</div>;

    return (
        <div className="top-items-container">
            <div className="top-items-header">
                <h2>Top Selling Items</h2>

                <div className="top-items-controls">
                    <div className="view-selector">
                        <select
                            value={view}
                            onChange={handleViewChange}
                            className="view-select"
                        >
                            <option value="quantity">By Quantity</option>
                            <option value="revenue">By Revenue</option>
                        </select>
                    </div>

                    <div className="range-selector">
                        <select
                            value={dateRange}
                            onChange={handleDateRangeChange}
                            className="range-select"
                        >
                            <option value="week">Last 7 Days</option>
                            <option value="month">Current Month</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>
                </div>
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

            {error && <div className="error-message">{error}</div>}

            {topItems.length === 0 ? (
                <p className="no-data-message">No sales data available for the selected period.</p>
            ) : (
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                tickFormatter={(value) =>
                                    view === 'revenue' ? `$${value}` : value
                                }
                            />
                            <Tooltip
                                formatter={(value, name) => {
                                    if (name === 'revenue') {
                                        return [`$${value.toFixed(2)}`, 'Revenue'];
                                    }
                                    return [value, 'Quantity Sold'];
                                }}
                                labelFormatter={(label, items) => {
                                    const item = items[0]?.payload;
                                    return item ? item.fullName : label;
                                }}
                            />
                            <Legend />
                            {view === 'quantity' ? (
                                <Bar
                                    dataKey="quantity"
                                    fill="#66bb6a"
                                    name="Quantity Sold"
                                />
                            ) : (
                                <Bar
                                    dataKey="revenue"
                                    fill="#1976d2"
                                    name="Revenue"
                                />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            <div className="top-items-table">
                <h3>Top {Math.min(topItems.length, 5)} Selling Items</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity Sold</th>
                        <th>Revenue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topItems.slice(0, 5).map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.revenue ? item.revenue.toFixed(2) : '0.00'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopSellingItems;