// src/components/order/OrderForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderApi } from '../../api/orderApi';
import { menuItemApi } from '../../api/menuItemApi';
import { categoryApi } from '../../api/categoryApi';

const OrderForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Order state
    const [orderItems, setOrderItems] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const [employeeId, setEmployeeId] = useState(1); // Default to ID 1 for simplicity
    const [orderStatus, setOrderStatus] = useState('PENDING');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);

                // Fetch categories
                const categoriesData = await categoryApi.getAllCategories();
                setCategories(categoriesData);

                // Fetch menu items
                const menuItemsData = await menuItemApi.getAllMenuItems();
                setMenuItems(menuItemsData);
                setFilteredItems(menuItemsData);

                // If in edit mode, fetch order data
                if (isEditMode) {
                    const orderData = await orderApi.getOrderById(id);

                    // Set order items
                    const items = orderData.items.map(item => ({
                        menuItemId: item.menuItemId,
                        menuItemName: item.menuItemName,
                        price: item.priceAtTimeOfOrder,
                        quantity: item.quantity,
                        subtotal: item.subtotal
                    }));

                    setOrderItems(items);
                    setOrderTotal(orderData.totalAmount);
                    setOrderStatus(orderData.status);
                    setEmployeeId(orderData.employeeId);
                }

                setError(null);
            } catch (err) {
                setError(`Failed to load data. ${err.message}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [id, isEditMode]);

    // Filter menu items based on selected category
    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredItems(menuItems);
        } else {
            setFilteredItems(menuItems.filter(item =>
                item.category.id.toString() === selectedCategory
            ));
        }
    }, [selectedCategory, menuItems]);

    // Calculate order total when items change
    useEffect(() => {
        const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
        setOrderTotal(total);
    }, [orderItems]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleAddItem = (menuItem) => {
        // Check if item already exists in order
        const existingItem = orderItems.find(item => item.menuItemId === menuItem.id);

        if (existingItem) {
            // Update quantity if item exists
            setOrderItems(orderItems.map(item =>
                item.menuItemId === menuItem.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: (item.quantity + 1) * item.price
                    }
                    : item
            ));
        } else {
            // Add new item
            setOrderItems([
                ...orderItems,
                {
                    menuItemId: menuItem.id,
                    menuItemName: menuItem.name,
                    price: menuItem.price,
                    quantity: 1,
                    subtotal: menuItem.price
                }
            ]);
        }
    };

    const handleRemoveItem = (menuItemId) => {
        setOrderItems(orderItems.filter(item => item.menuItemId !== menuItemId));
    };

    const handleChangeQuantity = (menuItemId, newQuantity) => {
        if (newQuantity < 1) {
            return;
        }

        setOrderItems(orderItems.map(item =>
            item.menuItemId === menuItemId
                ? {
                    ...item,
                    quantity: newQuantity,
                    subtotal: newQuantity * item.price
                }
                : item
        ));
    };

    const handleStatusChange = (e) => {
        setOrderStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (orderItems.length === 0) {
            setError('Order must contain at least one item');
            return;
        }

        try {
            const orderData = {
                employeeId: employeeId,
                items: orderItems.map(item => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity
                }))
            };

            if (isEditMode) {
                orderData.status = orderStatus;
                await orderApi.updateOrder(id, orderData);
            } else {
                await orderApi.createOrder(orderData);
            }

            navigate('/orders');
        } catch (err) {
            setError(`Failed to ${isEditMode ? 'update' : 'create'} order. ${err.message}`);
            console.error(err);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="order-form-container">
            <h2>{isEditMode ? 'Edit Order' : 'Create New Order'}</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="order-form-content">
                <div className="menu-selection-panel">
                    <h3>Menu Items</h3>

                    <div className="category-filter">
                        <label htmlFor="category-select">Filter by Category:</label>
                        <select
                            id="category-select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="menu-items-grid">
                        {filteredItems.map(item => (
                            <div key={item.id} className="menu-item-card for-order">
                                <div className="menu-item-details">
                                    <h4>{item.name}</h4>
                                    <p className="menu-item-category">{item.category.name}</p>
                                    <div className="menu-item-price">${item.price.toFixed(2)}</div>
                                </div>
                                <button
                                    className="btn btn-add-to-order"
                                    onClick={() => handleAddItem(item)}
                                    disabled={!item.isAvailable}
                                >
                                    {item.isAvailable ? 'Add to Order' : 'Not Available'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-summary-panel">
                    <h3>Order Summary</h3>

                    {isEditMode && (
                        <div className="form-group">
                            <label htmlFor="status-select">Order Status:</label>
                            <select
                                id="status-select"
                                value={orderStatus}
                                onChange={handleStatusChange}
                            >
                                <option value="PENDING">Pending</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELED">Canceled</option>
                            </select>
                        </div>
                    )}

                    {orderItems.length === 0 ? (
                        <p className="empty-order-message">
                            No items in order. Add items from the menu.
                        </p>
                    ) : (
                        <table className="order-items-table">
                            <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderItems.map(item => (
                                <tr key={item.menuItemId}>
                                    <td>{item.menuItemName}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <div className="quantity-control">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => handleChangeQuantity(item.menuItemId, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => handleChangeQuantity(item.menuItemId, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td>${item.subtotal.toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-remove"
                                            onClick={() => handleRemoveItem(item.menuItemId)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan="3" className="total-label">Total</td>
                                <td className="total-value" colSpan="2">${orderTotal.toFixed(2)}</td>
                            </tr>
                            </tfoot>
                        </table>
                    )}

                    <div className="order-form-actions">
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/orders')}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={orderItems.length === 0}
                        >
                            {isEditMode ? 'Update Order' : 'Create Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;