package com.restaurant.model;

// Employee extends User
public class Employee extends User {
    private String fullName;
    private String position;

    public Employee(String fullName, String position) {
        this.fullName = fullName;
        this.position = position;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
// Constructors, getters, setters
}