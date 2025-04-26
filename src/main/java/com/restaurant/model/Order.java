package com.restaurant.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Order {
    private int id;
    private LocalDateTime orderTime;
    private List<OrderItem> items;
    private double totalAmount;
    private String status; // PENDING, COMPLETED, CANCELED
    private Employee createdBy;

    // Default constructor
    public Order() {
        this.items = new ArrayList<>();
        this.orderTime = LocalDateTime.now();
        this.status = "PENDING";
    }

    // Constructor with all fields
    public Order(int id, LocalDateTime orderTime, List<OrderItem> items, double totalAmount, String status, Employee createdBy) {
        this.id = id;
        this.orderTime = orderTime;
        this.items = items;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdBy = createdBy;
    }

    // Getters and setters
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

    // Methods to calculate total, add/remove items
    public void calculateTotal() {
        double total = 0.0;
        if (items != null) {
            for (OrderItem item : items) {
                total += item.calculateSubtotal();
            }
        }
        this.totalAmount = total;
    }

    public void addItem(OrderItem item) {
        if (items == null) {
            items = new ArrayList<>();
        }

        // Set the order reference in the item
        item.setOrder(this);

        // Check if item with same menu item already exists
        boolean itemExists = false;
        for (OrderItem existingItem : items) {
            if (existingItem.getMenuItem().getId() == item.getMenuItem().getId()) {
                // If same menu item, just increase quantity
                existingItem.setQuantity(existingItem.getQuantity() + item.getQuantity());
                itemExists = true;
                break;
            }
        }

        // If item doesn't exist, add it
        if (!itemExists) {
            items.add(item);
        }

        // Recalculate total
        calculateTotal();
    }

    public void removeItem(int orderItemId) {
        if (items != null) {
            items.removeIf(item -> item.getId() == orderItemId);
            calculateTotal();
        }
    }

    public void clearItems() {
        if (items != null) {
            items.clear();
            totalAmount = 0.0;
        }
    }
}