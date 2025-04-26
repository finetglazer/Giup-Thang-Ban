package com.restaurant.dto;

import com.restaurant.model.OrderItem;

public class OrderItemDTO {
    private int id;
    private int menuItemId;
    private String menuItemName;
    private int quantity;
    private double priceAtTimeOfOrder;
    private double subtotal;

    // Constructors
    public OrderItemDTO() {
    }

    // Convert from model to DTO
    public static OrderItemDTO fromOrderItem(OrderItem orderItem) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(orderItem.getId());

        if (orderItem.getMenuItem() != null) {
            dto.setMenuItemId(orderItem.getMenuItem().getId());
            dto.setMenuItemName(orderItem.getMenuItem().getName());
        }

        dto.setQuantity(orderItem.getQuantity());
        dto.setPriceAtTimeOfOrder(orderItem.getPriceAtTimeOfOrder());
        dto.setSubtotal(orderItem.calculateSubtotal());

        return dto;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(int menuItemId) {
        this.menuItemId = menuItemId;
    }

    public String getMenuItemName() {
        return menuItemName;
    }

    public void setMenuItemName(String menuItemName) {
        this.menuItemName = menuItemName;
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

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }
}