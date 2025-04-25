package com.restaurant;

import com.restaurant.util.DatabaseConnection;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * Main class to test database connectivity and basic operations
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("Restaurant Management System");
        System.out.println("---------------------------");

        try {
            // Test database connection
            Connection conn = DatabaseConnection.getConnection();
            System.out.println("Successfully connected to the database!");
            // Close the connection
            DatabaseConnection.closeConnection();

        } catch (SQLException e) {
            System.err.println("Database operation failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}