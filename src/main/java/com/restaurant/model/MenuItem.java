package com.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {
    private int id;
    private String name;
    private double price;
    private String description;
    private Category category;
    private boolean isAvailable;
}