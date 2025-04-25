// src/components/category/CategoryList.jsx
import React, { useState, useEffect } from 'react';
import { categoryApi } from '../../api/categoryApi';
import CategoryItem from './CategoryItem';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await categoryApi.getAllCategories();
                setCategories(data);
                setError(null);
            } catch (err) {
                setError('Failed to load categories. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await categoryApi.deleteCategory(id);
                setCategories(categories.filter(category => category.id !== id));
            } catch (error) {
                setError('Failed to delete category. Please try again.');
                console.error(error);
            }
        }
    };

    if (loading) return <div className="loading">Loading categories...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="category-list-container">
            <div className="category-list-header">
                <h2>Categories</h2>
                <Link to="/categories/new" className="btn btn-primary">
                    Add New Category
                </Link>
            </div>

            {categories.length === 0 ? (
                <p>No categories found. Start by adding a new category.</p>
            ) : (
                <div className="category-grid">
                    {categories.map(category => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            onDelete={handleDeleteCategory}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;

