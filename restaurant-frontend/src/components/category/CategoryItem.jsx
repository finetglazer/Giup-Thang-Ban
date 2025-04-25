// src/components/category/CategoryItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = ({ category, onDelete }) => {
    const { id, name, description } = category;

    return (
        <div className="category-item">
            <div className="category-content">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <div className="category-actions">
                <Link to={`/categories/edit/${id}`} className="btn btn-edit">
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(id)}
                    className="btn btn-delete"
                >
                    Delete
                </button>
                <Link to={`/menu-items/category/${id}`} className="btn btn-view">
                    View Items
                </Link>
            </div>
        </div>
    );
};

export default CategoryItem;