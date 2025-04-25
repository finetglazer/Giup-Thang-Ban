// src/components/category/CategoryForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoryApi } from '../../api/categoryApi';

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            const fetchCategory = async () => {
                try {
                    setLoading(true);
                    const data = await categoryApi.getCategoryById(id);
                    setFormData({
                        name: data.name,
                        description: data.description
                    });
                    setError(null);
                } catch (err) {
                    setError('Failed to load category details. Please try again.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchCategory();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            setError('Category name is required');
            return;
        }

        try {
            setLoading(true);
            if (isEditMode) {
                await categoryApi.updateCategory(id, formData);
            } else {
                await categoryApi.createCategory(formData);
            }
            navigate('/categories');
        } catch (err) {
            setError(`Failed to ${isEditMode ? 'update' : 'create'} category. Please try again.`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div className="loading">Loading category details...</div>;

    return (
        <div className="category-form-container">
            <h2>{isEditMode ? 'Edit Category' : 'Add New Category'}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="category-form">
                <div className="form-group">
                    <label htmlFor="name">Category Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter category name"
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
                        placeholder="Enter category description"
                        rows="3"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/categories')}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update Category' : 'Create Category')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;