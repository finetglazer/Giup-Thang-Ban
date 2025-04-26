// src/components/common/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    // Helper function to check if a path is active
    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    return (
        <div className="sidebar">
            <nav className="sidebar-nav">
                <div className="sidebar-section">
                    <h3>Menu Management</h3>
                    <ul>
                        <li>
                            <Link
                                to="/categories"
                                className={isActive('/categories') ? 'active' : ''}
                            >
                                Manage Categories
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/menu-items"
                                className={isActive('/menu-items') ? 'active' : ''}
                            >
                                Manage Menu Items
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/menu-view"
                                className={isActive('/menu-view') ? 'active' : ''}
                            >
                                View Menu
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-section">
                    <h3>Order Management</h3>
                    <ul>
                        <li>
                            <Link
                                to="/orders"
                                className={isActive('/orders') ? 'active' : ''}
                            >
                                View Orders
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/orders/new"
                                className={location.pathname === '/orders/new' ? 'active' : ''}
                            >
                                Create New Order
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-section">
                    <h3>Statistics</h3>
                    <ul>
                        <li>
                            <Link
                                to="/statistics"
                                className={location.pathname === '/statistics' ? 'active' : ''}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/statistics/detailed"
                                className={location.pathname === '/statistics/detailed' ? 'active' : ''}
                            >
                                Detailed Statistics
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;