// src/pages/StatisticsDashboard.jsx
import React from 'react';
import Layout from '../components/common/Layout';
import RevenueOverview from '../components/statistics/RevenueOverview';
import RevenueChart from '../components/statistics/RevenueChart';
import TopSellingItems from '../components/statistics/TopSellingItems';

const StatisticsDashboard = () => {
    return (
        <Layout>
            <div className="statistics-dashboard">
                <h1>Revenue Statistics</h1>

                <div className="statistics-content">
                    <RevenueOverview />

                    <div className="statistics-charts">
                        <RevenueChart />
                        <TopSellingItems />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default StatisticsDashboard;