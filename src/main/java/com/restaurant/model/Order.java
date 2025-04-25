package com.restaurant.model;

import java.time.LocalDateTime;
import java.util.List;

public class Order {
    private int id;
    private LocalDateTime orderTime;
    private List<OrderItem> items;
    private double totalAmount;
    private String status; // PENDING, COMPLETED, CANCELED
    private Employee createdBy;

    // Methods to calculate total, add/remove items
    // Constructors, getters, setters


    public Order(int id, LocalDateTime orderTime, List<OrderItem> items, double totalAmount, String status, Employee createdBy) {
        this.id = id;
        this.orderTime = orderTime;
        this.items = items;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdBy = createdBy;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Employee getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Employee createdBy) {
        this.createdBy = createdBy;
    }
}
