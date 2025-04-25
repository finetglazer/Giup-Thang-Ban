package com.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private LocalDateTime timestamp = LocalDateTime.now();
    private boolean success;
    private String message;
    private T data;

    // Constructor for success responses with data
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(LocalDateTime.now(), true, "Operation successful", data);
    }

    // Constructor for success responses with a custom message
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(LocalDateTime.now(), true, message, data);
    }

    // Constructor for error responses
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(LocalDateTime.now(), false, message, null);
    }
}