// src/components/order/OrderItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ order, onDelete, onStatusChange }) => {
    const { id, orderTime, items, totalAmount, status, employeeName } = order;

    // Format date and time
    const formatDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleString();
    };

    // Get appropriate status class for styling
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'status-completed';
            case 'canceled':
                return 'status-canceled';
            case 'pending':
                return 'status-pending';
            default:
                return '';
        }
    };

    // Handle status change
    const handleStatusChange = (e) => {
        onStatusChange(id, e.target.value);
    };

    return (
        <div className="order-card">
            <div className="order-header">
                <div className="order-id">Order #{id}</div>
                <div className={`order-status ${getStatusClass(status)}`}>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="status-select"
                    >
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELED">Canceled</option>
                    </select>
                </div>
            </div>

            <div className="order-meta">
                <div className="order-time">
                    <strong>Time:</strong> {formatDateTime(orderTime)}
                </div>
                <div className="order-employee">
                    <strong>Created by:</strong> {employeeName}
                </div>
            </div>

            <div className="order-items-summary">
                <h4>Items: {items.length}</h4>
                <ul className="order-items-list">
                    {items.slice(0, 3).map(item => (
                        <li key={item.id} className="order-item-summary">
                            {item.quantity}x {item.menuItemName}
                        </li>
                    ))}
                    {items.length > 3 && <li className="more-items">+{items.length - 3} more items</li>}
                </ul>
            </div>

            <div className="order-total">
                <strong>Total:</strong> ${totalAmount.toFixed(2)}
            </div>

            <div className="order-actions">
                <Link to={`/orders/${id}`} className="btn btn-view">
                    View Details
                </Link>
                <Link to={`/orders/edit/${id}`} className="btn btn-edit">
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

export default OrderItem;