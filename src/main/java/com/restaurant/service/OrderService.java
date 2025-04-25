package com.restaurant.service;

import com.restaurant.model.Order;

import java.time.LocalDate;
import java.util.List;


public interface OrderService {
    void createOrder(Order order);
    List<Order> getAllOrders();
    Order getOrderById(int id);
    List<Order> getOrdersByDate(LocalDate date);
}
