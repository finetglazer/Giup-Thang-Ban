// src/components/order/OrderList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderApi } from '../../api/orderApi';
import OrderItem from './OrderItem';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterDate, setFilterDate] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await orderApi.getAllOrders();
            setOrders(data);
            setError(null);
            setIsFiltered(false);
        } catch (err) {
            setError('Failed to load orders. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDateFilter = async () => {
        if (!filterDate) {
            setError('Please select a date to filter');
            return;
        }

        try {
            setLoading(true);
            const data = await orderApi.getOrdersByDate(filterDate);
            setOrders(data);
            setError(null);
            setIsFiltered(true);
        } catch (err) {
            setError(`Failed to load orders for date ${filterDate}. Please try again.`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClearFilter = () => {
        setFilterDate('');
        fetchOrders();
    };

    const handleDeleteOrder = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await orderApi.deleteOrder(id);
                setOrders(orders.filter(order => order.id !== id));
            } catch (error) {
                setError('Failed to delete order. Please try again.');
                console.error(error);
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await orderApi.updateOrderStatus(id, newStatus);

            // Update the local state
            setOrders(orders.map(order =>
                order.id === id ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            setError('Failed to update order status. Please try again.');
            console.error(error);
        }
    };

    if (loading) return <div className="loading">Loading orders...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="order-list-container">
            <div className="order-list-header">
                <h2>Orders</h2>
                <div className="order-actions">
                    <div className="date-filter">
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="date-input"
                        />
                        <button onClick={handleDateFilter} className="btn btn-secondary">
                            Filter
                        </button>
                        {isFiltered && (
                            <button onClick={handleClearFilter} className="btn btn-secondary">
                                Clear Filter
                            </button>
                        )}
                    </div>
                    <Link to="/orders/new" className="btn btn-primary">
                        Create New Order
                    </Link>
                </div>
            </div>

            {orders.length === 0 ? (
                <p>No orders found. Start by creating a new order.</p>
            ) : (
                <div className="order-grid">
                    {orders.map(order => (
                        <OrderItem
                            key={order.id}
                            order={order}
                            onDelete={handleDeleteOrder}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderList;