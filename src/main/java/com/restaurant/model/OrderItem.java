package com.restaurant.model;

public class OrderItem {
    private int id;
    private MenuItem menuItem;
    private int quantity;
    private double priceAtTimeOfOrder;

    // Methods to calculate subtotal
    // Constructors, getters, setters


    public OrderItem(int id, MenuItem menuItem, int quantity, double priceAtTimeOfOrder) {
        this.id = id;
        this.menuItem = menuItem;
        this.quantity = quantity;
        this.priceAtTimeOfOrder = priceAtTimeOfOrder;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPriceAtTimeOfOrder() {
        return priceAtTimeOfOrder;
    }

    public void setPriceAtTimeOfOrder(double priceAtTimeOfOrder) {
        this.priceAtTimeOfOrder = priceAtTimeOfOrder;
    }
}