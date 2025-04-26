// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CategoryManagement from './pages/CategoryManagement';
import MenuManagement from './pages/MenuManagement';
import MenuViewPage from './pages/MenuViewPage';
import OrderManagement from './pages/OrderManagement';
import StatisticsDashboard from './pages/StatisticsDashboard';
import DetailedStatistics from './pages/DetailedStatistics';
import './styles.css';
import './components/statistics/statistics.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/categories/*" element={<CategoryManagement />} />
                <Route path="/menu-items/*" element={<MenuManagement />} />
                <Route path="/menu-view" element={<MenuViewPage />} />
                <Route path="/orders/*" element={<OrderManagement />} />
                <Route path="/statistics" element={<StatisticsDashboard />} />
                <Route path="/statistics/detailed" element={<DetailedStatistics />} />
            </Routes>
        </Router>
    );
};

export default App;