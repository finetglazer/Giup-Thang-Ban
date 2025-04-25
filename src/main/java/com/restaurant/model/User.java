package com.restaurant.model;

import javax.management.relation.Role;

// Base class
public abstract class User {
    private int id;
    private String username;
    private String password; // Would be hashed in practice
    private Role role;

    // Constructors, getters, setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public User() {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

