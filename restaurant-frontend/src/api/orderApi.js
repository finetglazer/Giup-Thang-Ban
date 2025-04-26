// src/api/orderApi.js
const API_BASE_URL = 'http://localhost:8080/api';

export const orderApi = {
    // Get all orders
    getAllOrders: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    // Get order by ID
    getOrderById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch order');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error(`Error fetching order ${id}:`, error);
            throw error;
        }
    },

    // Get orders by date
    getOrdersByDate: async (date) => {
        // Date should be in ISO format (YYYY-MM-DD)
        try {
            const response = await fetch(`${API_BASE_URL}/orders/date/${date}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders by date');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error(`Error fetching orders for date ${date}:`, error);
            throw error;
        }
    },

    // Create a new order
    createOrder: async (orderData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            if (!response.ok) {
                throw new Error('Failed to create order');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    // Update an existing order
    updateOrder: async (id, orderData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            if (!response.ok) {
                throw new Error('Failed to update order');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error(`Error updating order ${id}:`, error);
            throw error;
        }
    },

    // Update only the status of an order
    updateOrderStatus: async (id, status) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error(`Error updating status for order ${id}:`, error);
            throw error;
        }
    },

    // Delete an order
    deleteOrder: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
            return true;
        } catch (error) {
            console.error(`Error deleting order ${id}:`, error);
            throw error;
        }
    },
};