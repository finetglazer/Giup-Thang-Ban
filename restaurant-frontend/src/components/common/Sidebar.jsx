// src/components/common/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav className="sidebar-nav">
                <div className="sidebar-section">
                    <h3>Menu Management</h3>
                    <ul>
                        <li>
                            <Link to="/categories">Manage Categories</Link>
                        </li>
                        <li>
                            <Link to="/menu-items">Manage Menu Items</Link>
                        </li>
                        <li>
                            <Link to="/menu-view">View Menu</Link>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-section">
                    <h3>Order Management</h3>
                    <ul>
                        <li>
                            <Link to="/orders">View Orders</Link>
                        </li>
                        <li>
                            <Link to="/orders/new">Create New Order</Link>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-section">
                    <h3>Statistics</h3>
                    <ul>
                        <li>
                            <Link to="/statistics/daily">Daily Revenue</Link>
                        </li>
                        <li>
                            <Link to="/statistics/menu">Menu Statistics</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;