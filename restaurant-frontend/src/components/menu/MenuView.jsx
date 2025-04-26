// src/components/menu/MenuView.jsx
import React, { useState, useEffect } from 'react';
import { menuViewApi } from '../../api/menuViewApi';
import { categoryApi } from '../../api/categoryApi';
import { Link } from 'react-router-dom';

const MenuView = () => {
    const [menuItemsByCategory, setMenuItemsByCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories and menu items on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch all categories
                const categoriesData = await categoryApi.getAllCategories();
                setCategories(categoriesData);

                // Set active category to the first one if exists
                if (categoriesData.length > 0) {
                    setActiveCategory(categoriesData[0].id);
                }

                // Fetch all menu items grouped by category
                const menuData = await menuViewApi.getMenuItemsGroupedByCategory();
                setMenuItemsByCategory(menuData);

                setError(null);
            } catch (err) {
                setError('Failed to load menu. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
    };

    if (loading) return <div className="loading">Loading menu...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="menu-view-container">
            <div className="menu-view-header">
                <h2>Menu</h2>
                <Link to="/orders/new" className="btn btn-primary">Create New Order</Link>
            </div>

            <div className="menu-view-content">
                {/* Category sidebar */}
                <div className="category-sidebar">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        {categories.map(category => (
                            <li
                                key={category.id}
                                className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Menu items display */}
                <div className="menu-items-display">
                    {activeCategory && categories.map(category => (
                        category.id === activeCategory && (
                            <div key={category.id} className="category-menu-items">
                                <h3>{category.name}</h3>
                                {menuItemsByCategory[category.name] &&
                                menuItemsByCategory[category.name].length > 0 ? (
                                    <div className="menu-items-grid">
                                        {menuItemsByCategory[category.name].map(item => (
                                            <div key={item.id} className="menu-item-card for-order">
                                                <div className="menu-item-details">
                                                    <h4>{item.name}</h4>
                                                    <p className="menu-item-description">{item.description}</p>
                                                    <div className="menu-item-price">${item.price.toFixed(2)}</div>
                                                </div>
                                                <button className="btn btn-add-to-order">
                                                    Add to Order
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No menu items available in this category.</p>
                                )}
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuView;