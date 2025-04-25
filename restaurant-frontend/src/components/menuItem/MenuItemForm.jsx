
// src/components/menuItem/MenuItemForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuItemApi } from '../../api/menuItemApi';
import { categoryApi } from '../../api/categoryApi';

const MenuItemForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        categoryId: '',
        isAvailable: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryApi.getAllCategories();
                setCategories(data);

                // Set default category if creating new item and categories exist
                if (!isEditMode && data.length > 0 && !formData.categoryId) {
                    setFormData(prev => ({
                        ...prev,
                        categoryId: data[0].id
                    }));
                }
            } catch (err) {
                setError('Failed to load categories. Please try again.');
                console.error(err);
            }
        };

        fetchCategories();
    }, [isEditMode, formData.categoryId]);

    useEffect(() => {
        if (isEditMode) {
            const fetchMenuItem = async () => {
                try {
                    setLoading(true);
                    const data = await menuItemApi.getMenuItemById(id);
                    setFormData({
                        name: data.name,
                        price: data.price.toString(),
                        description: data.description,
                        categoryId: data.category.id,
                        isAvailable: data.isAvailable
                    });
                } catch (err) {
                    setError('Failed to load menu item details. Please try again.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchMenuItem();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            setError('Menu item name is required');
            return;
        }

        if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
            setError('Price must be a positive number');
            return;
        }

        if (!formData.categoryId) {
            setError('Category selection is required');
            return;
        }

        try {
            setLoading(true);

            // Find the selected category object
            const selectedCategory = categories.find(cat => cat.id.toString() === formData.categoryId.toString());

            // Prepare the data to send to the API
            const menuItemData = {
                name: formData.name,
                price: parseFloat(formData.price),
                description: formData.description,
                category: selectedCategory,
                isAvailable: formData.isAvailable
            };

            if (isEditMode) {
                // For edit mode, we need to include the ID
                menuItemData.id = parseInt(id);
                await menuItemApi.updateMenuItem(id, menuItemData);
            } else {
                await menuItemApi.createMenuItem(menuItemData);
            }

            navigate('/menu-items');
        } catch (err) {
            setError(`Failed to ${isEditMode ? 'update' : 'create'} menu item. Please try again.`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div className="loading">Loading menu item details...</div>;

    return (
        <div className="menu-item-form-container">
            <h2>{isEditMode ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="menu-item-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter menu item name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter menu item description"
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categoryId">Category</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="isAvailable"
                            checked={formData.isAvailable}
                            onChange={handleChange}
                        />
                        Item is available
                    </label>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/menu-items')}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update Menu Item' : 'Create Menu Item')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MenuItemForm;