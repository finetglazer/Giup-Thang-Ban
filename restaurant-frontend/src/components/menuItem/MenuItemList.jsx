// src/components/menuItem/MenuItemList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { menuItemApi } from '../../api/menuItemApi';
import { categoryApi } from '../../api/categoryApi';
import MenuItemDetails from './MenuItemDetails';

const MenuItemList = () => {
    const { categoryId } = useParams();

    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryApi.getAllCategories();
                setCategories(data);
            } catch (err) {
                console.error('Error fetching categories:', err);
                // We don't set the main error state here as we're mainly focused on menu items
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                setLoading(true);
                let data;

                if (selectedCategory && selectedCategory !== 'all') {
                    data = await menuItemApi.getMenuItemsByCategory(selectedCategory);
                } else {
                    data = await menuItemApi.getAllMenuItems();
                }

                setMenuItems(data);
                setError(null);
            } catch (err) {
                setError('Failed to load menu items. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [selectedCategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleDeleteMenuItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            try {
                await menuItemApi.deleteMenuItem(id);
                setMenuItems(menuItems.filter(item => item.id !== id));
            } catch (error) {
                setError('Failed to delete menu item. Please try again.');
                console.error(error);
            }
        }
    };

    if (loading) return <div className="loading">Loading menu items...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="menu-item-list-container">
            <div className="menu-list-header">
                <h2>Menu Items</h2>
                <div className="menu-actions">
                    <div className="category-filter">
                        <label htmlFor="category-select">Filter by Category:</label>
                        <select
                            id="category-select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Link to="/menu-items/new" className="btn btn-primary">
                        Add New Menu Item
                    </Link>
                </div>
            </div>

            {menuItems.length === 0 ? (
                <p>No menu items found. Start by adding a new menu item.</p>
            ) : (
                <div className="menu-item-grid">
                    {menuItems.map(menuItem => (
                        <MenuItemDetails
                            key={menuItem.id}
                            menuItem={menuItem}
                            onDelete={handleDeleteMenuItem}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuItemList;
