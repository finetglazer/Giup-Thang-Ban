package com.restaurant.dao;

import com.restaurant.model.Order;
import com.restaurant.model.OrderItem;

import java.sql.SQLException;
import java.util.List;

public interface OrderItemDAO {
    void add(OrderItem orderItem) throws SQLException;
    void update(OrderItem orderItem) throws SQLException;
    void delete(int id) throws SQLException;
    OrderItem getById(int id) throws SQLException;
    List<OrderItem> getByOrder(Order order) throws SQLException;
}