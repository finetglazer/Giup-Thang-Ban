// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">Restaurant Management System</Link>
                </div>
                <nav className="main-nav">
                    <ul>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/categories">Categories</Link>
                        </li>
                        <li>
                            <Link to="/menu-items">Menu Items</Link>
                        </li>
                        <li>
                            <Link to="/menu-view">View Menu</Link>
                        </li>
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                    </ul>
                </nav>
                <div className="user-menu">
                    <span className="user-name">Admin</span>
                    <button className="logout-btn">Logout</button>
                </div>
            </div>
        </header>
    );
};

export default Header;