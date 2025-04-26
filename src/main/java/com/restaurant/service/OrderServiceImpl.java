package com.restaurant.service;

import com.restaurant.dao.OrderDAO;
import com.restaurant.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderDAO orderDAO;

    @Autowired
    public OrderServiceImpl(OrderDAO orderDAO) {
        this.orderDAO = orderDAO;
    }

    @Override
    public void createOrder(Order order) {
        try {
            // Calculate total amount before saving
            order.calculateTotal();
            orderDAO.add(order);
        } catch (SQLException e) {
            throw new RuntimeException("Error creating order: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Order> getAllOrders() {
        try {
            return orderDAO.getAll();
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving all orders: " + e.getMessage(), e);
        }
    }

    @Override
    public Order getOrderById(int id) {
        try {
            return orderDAO.getById(id);
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving order with ID " + id + ": " + e.getMessage(), e);
        }
    }

    @Override
    public List<Order> getOrdersByDate(LocalDate date) {
        try {
            return orderDAO.getByDate(date);
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving orders for date " + date + ": " + e.getMessage(), e);
        }
    }

    // Additional useful methods

    public void updateOrder(Order order) {
        try {
            // Calculate total amount before saving
            order.calculateTotal();
            orderDAO.update(order);
        } catch (SQLException e) {
            throw new RuntimeException("Error updating order: " + e.getMessage(), e);
        }
    }

    public void deleteOrder(int id) {
        try {
            orderDAO.delete(id);
        } catch (SQLException e) {
            throw new RuntimeException("Error deleting order with ID " + id + ": " + e.getMessage(), e);
        }
    }

    public void changeOrderStatus(int orderId, String newStatus) {
        try {
            Order order = orderDAO.getById(orderId);
            if (order != null) {
                order.setStatus(newStatus);
                orderDAO.update(order);
            } else {
                throw new RuntimeException("Order with ID " + orderId + " not found");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error changing order status: " + e.getMessage(), e);
        }
    }
}