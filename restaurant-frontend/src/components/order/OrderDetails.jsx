// src/components/order/OrderDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { orderApi } from '../../api/orderApi';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const data = await orderApi.getOrderById(id);
                setOrder(data);
                setError(null);
            } catch (err) {
                setError('Failed to load order details. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        try {
            await orderApi.updateOrderStatus(id, newStatus);
            setOrder({ ...order, status: newStatus });
        } catch (error) {
            setError('Failed to update order status. Please try again.');
            console.error(error);
        }
    };

    const handleDeleteOrder = async () => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await orderApi.deleteOrder(id);
                navigate('/orders');
            } catch (error) {
                setError('Failed to delete order. Please try again.');
                console.error(error);
            }
        }
    };

    // Format date and time
    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr) return '';
        const date = new Date(dateTimeStr);
        return date.toLocaleString();
    };

    // Get appropriate status class for styling
    const getStatusClass = (status) => {
        if (!status) return '';

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

    if (loading) return <div className="loading">Loading order details...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!order) return <div className="not-found">Order not found</div>;

    return (
        <div className="order-details-container">
            <div className="order-details-header">
                <h2>Order #{order.id}</h2>
                <div className="order-details-actions">
                    <Link to={`/orders/edit/${order.id}`} className="btn btn-primary">
                        Edit Order
                    </Link>
                    <button onClick={handleDeleteOrder} className="btn btn-delete">
                        Delete Order
                    </button>
                </div>
            </div>

            <div className="order-info-card">
                <div className="order-info-section">
                    <div className="order-info-row">
                        <span className="order-info-label">Order Date:</span>
                        <span className="order-info-value">{formatDateTime(order.orderTime)}</span>
                    </div>
                    <div className="order-info-row">
                        <span className="order-info-label">Created By:</span>
                        <span className="order-info-value">{order.employeeName}</span>
                    </div>
                    <div className="order-info-row">
                        <span className="order-info-label">Status:</span>
                        <div className="order-info-value status-container">
                            <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                                {order.status}
                            </span>
                            <div className="status-actions">
                                <button
                                    className={`status-btn ${order.status === 'PENDING' ? 'active' : ''}`}
                                    onClick={() => handleStatusChange('PENDING')}
                                >
                                    Pending
                                </button>
                                <button
                                    className={`status-btn ${order.status === 'COMPLETED' ? 'active' : ''}`}
                                    onClick={() => handleStatusChange('COMPLETED')}
                                >
                                    Complete
                                </button>
                                <button
                                    className={`status-btn ${order.status === 'CANCELED' ? 'active' : ''}`}
                                    onClick={() => handleStatusChange('CANCELED')}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-items-container">
                <h3>Order Items</h3>
                <table className="order-items-table">
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.items.map(item => (
                        <tr key={item.id}>
                            <td>{item.menuItemName}</td>
                            <td>${item.priceAtTimeOfOrder.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>${item.subtotal.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="3" className="total-label">Total</td>
                        <td className="total-value">${order.totalAmount.toFixed(2)}</td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            <div className="order-details-footer">
                <Link to="/orders" className="btn btn-secondary">
                    Back to Orders
                </Link>
            </div>
        </div>
    );
};

export default OrderDetails;