package com.restaurant.dto;

import com.restaurant.model.Order;
import com.restaurant.model.OrderItem;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDTO {
    private int id;
    private LocalDateTime orderTime;
    private List<OrderItemDTO> items;
    private double totalAmount;
    private String status;
    private int employeeId;
    private String employeeName;

    // Constructors
    public OrderDTO() {
        this.items = new ArrayList<>();
    }

    // Convert from model to DTO
    public static OrderDTO fromOrder(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setOrderTime(order.getOrderTime());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());

        if (order.getCreatedBy() != null) {
            dto.setEmployeeId(order.getCreatedBy().getId());
            dto.setEmployeeName(order.getCreatedBy().getFullName());
        }

        // Convert order items
        if (order.getItems() != null) {
            dto.setItems(order.getItems().stream()
                    .map(OrderItemDTO::fromOrderItem)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    // Getters and Setters
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

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
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

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
}