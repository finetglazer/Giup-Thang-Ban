package com.restaurant.dao;

import com.restaurant.model.Order;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

public interface OrderDAO {
    void add(Order order) throws SQLException;
    void update(Order order) throws SQLException;
    void delete(int id) throws SQLException;
    Order getById(int id) throws SQLException;
    List<Order> getAll() throws SQLException;
    List<Order> getByDate(LocalDate date) throws SQLException;
}