package com.restaurant.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Database connection utility class for establishing connection to MySQL database
 */
public class DatabaseConnection {
    // Database credentials
    private static final String URL = "jdbc:mysql://localhost:3333/restaurant_management";
    private static final String USER = "user"; // Replace with your MySQL username
    private static final String PASSWORD = "password"; // Replace with your MySQL password

    private static Connection connection = null;

    /**
     * Get a connection to the database
     * @return Connection object
     * @throws SQLException if connection fails
     */
    public static Connection getConnection() throws SQLException {
        if (connection == null || connection.isClosed()) {
            try {
                // Load the MySQL JDBC driver
                Class.forName("com.mysql.cj.jdbc.Driver");

                // Create the connection
                connection = DriverManager.getConnection(URL, USER, PASSWORD);
                System.out.println("Database connection established successfully");
            } catch (ClassNotFoundException e) {
                System.err.println("MySQL JDBC Driver not found");
                e.printStackTrace();
                throw new SQLException("MySQL JDBC Driver not found", e);
            } catch (SQLException e) {
                System.err.println("Failed to connect to database");
                e.printStackTrace();
                throw e;
            }
        }
        return connection;
    }

    /**
     * Close the database connection
     */
    public static void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("Database connection closed");
            }
        } catch (SQLException e) {
            System.err.println("Error closing database connection");
            e.printStackTrace();
        }
    }
}