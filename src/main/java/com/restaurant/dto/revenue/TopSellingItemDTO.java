
// src/main/java/com/restaurant/dto/revenue/TopSellingItemDTO.java
package com.restaurant.dto.revenue;

public class TopSellingItemDTO {
    private Integer id;
    private String name;
    private Integer quantity;
    private Double revenue;

    public TopSellingItemDTO() {
    }

    public TopSellingItemDTO(Integer id, String name, Integer quantity, Double revenue) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.revenue = revenue;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }
}


