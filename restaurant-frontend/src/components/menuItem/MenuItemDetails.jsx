import React from 'react';
import { Link } from 'react-router-dom';

const MenuItemDetails = ({ menuItem, onDelete }) => {
    const { id, name, price, description, category, isAvailable } = menuItem;

    return (
        <div className={`menu-item-card ${!isAvailable ? 'unavailable' : ''}`}>
            <div className="menu-item-content">
                <div className="menu-item-header">
                    <h3>{name}</h3>
                    <span className="menu-item-price">${price.toFixed(2)}</span>
                </div>

                <p className="menu-item-description">{description}</p>

                <div className="menu-item-meta">
          <span className="menu-item-category">
            Category: {category.name}
          </span>
                    <span className={`menu-item-status ${isAvailable ? 'available' : 'unavailable'}`}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
                </div>
            </div>

            <div className="menu-item-actions">
                <Link to={`/menu-items/edit/${id}`} className="btn btn-edit">
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(id)}
                    className="btn btn-delete"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default MenuItemDetails;