package com.restaurant.service;

import com.restaurant.dao.OrderDAO;
import com.restaurant.model.MenuItem;
import com.restaurant.model.Order;
import com.restaurant.model.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RevenueServiceImpl implements RevenueService {

    private final OrderDAO orderDAO;

    @Autowired
    public RevenueServiceImpl(OrderDAO orderDAO) {
        this.orderDAO = orderDAO;
    }

    @Override
    public double getDailyRevenue(LocalDate date) {
        try {
            List<Order> dailyOrders = orderDAO.getByDate(date);
            return calculateTotalRevenue(dailyOrders);
        } catch (SQLException e) {
            throw new RuntimeException("Error getting daily revenue: " + e.getMessage(), e);
        }
    }

    @Override
    public double getWeeklyRevenue(LocalDate startDate) {
        try {
            // Calculate the end date (7 days from start date)
            LocalDate endDate = startDate.plusDays(6);

            double totalRevenue = 0.0;
            LocalDate currentDate = startDate;

            // Iterate through each day in the week
            while (!currentDate.isAfter(endDate)) {
                List<Order> dailyOrders = orderDAO.getByDate(currentDate);
                totalRevenue += calculateTotalRevenue(dailyOrders);
                currentDate = currentDate.plusDays(1);
            }

            return totalRevenue;
        } catch (SQLException e) {
            throw new RuntimeException("Error getting weekly revenue: " + e.getMessage(), e);
        }
    }

    @Override
    public double getMonthlyRevenue(int year, int month) {
        try {
            // Create a YearMonth from the provided year and month
            YearMonth yearMonth = YearMonth.of(year, month);

            // Get the first and last day of the month
            LocalDate startDate = yearMonth.atDay(1);
            LocalDate endDate = yearMonth.atEndOfMonth();

            double totalRevenue = 0.0;
            LocalDate currentDate = startDate;

            // Iterate through each day in the month
            while (!currentDate.isAfter(endDate)) {
                List<Order> dailyOrders = orderDAO.getByDate(currentDate);
                totalRevenue += calculateTotalRevenue(dailyOrders);
                currentDate = currentDate.plusDays(1);
            }

            return totalRevenue;
        } catch (SQLException e) {
            throw new RuntimeException("Error getting monthly revenue: " + e.getMessage(), e);
        }
    }

    @Override
    public Map<MenuItem, Integer> getTopSellingItems(LocalDate startDate, LocalDate endDate) {
        try {
            Map<MenuItem, Integer> itemCountMap = new HashMap<>();
            LocalDate currentDate = startDate;

            // Iterate through each day in the range
            while (!currentDate.isAfter(endDate)) {
                List<Order> dailyOrders = orderDAO.getByDate(currentDate);

                // Process each order and count menu items
                for (Order order : dailyOrders) {
                    // Only consider completed orders
                    if ("COMPLETED".equals(order.getStatus())) {
                        for (OrderItem orderItem : order.getItems()) {
                            MenuItem menuItem = orderItem.getMenuItem();
                            int quantity = orderItem.getQuantity();

                            // Update the count for this menu item
                            itemCountMap.put(menuItem, itemCountMap.getOrDefault(menuItem, 0) + quantity);
                        }
                    }
                }

                currentDate = currentDate.plusDays(1);
            }

            return itemCountMap;
        } catch (SQLException e) {
            throw new RuntimeException("Error getting top selling items: " + e.getMessage(), e);
        }
    }

    // Helper method to calculate total revenue from a list of orders
    private double calculateTotalRevenue(List<Order> orders) {
        return orders.stream()
                .filter(order -> "COMPLETED".equals(order.getStatus())) // Only count completed orders
                .mapToDouble(Order::getTotalAmount)
                .sum();
    }

    // Additional method to get daily revenue for a date range (useful for charts)
    public Map<LocalDate, Double> getDailyRevenueForRange(LocalDate startDate, LocalDate endDate) {
        Map<LocalDate, Double> dailyRevenueMap = new HashMap<>();
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            double dailyRevenue = getDailyRevenue(currentDate);
            dailyRevenueMap.put(currentDate, dailyRevenue);
            currentDate = currentDate.plusDays(1);
        }

        return dailyRevenueMap;
    }

    // Method to get top 5 selling items
    public Map<String, Integer> getTop5SellingItems(LocalDate startDate, LocalDate endDate) {
        Map<MenuItem, Integer> allItems = getTopSellingItems(startDate, endDate);

        // Convert to map of name -> quantity and get top 5
        return allItems.entrySet().stream()
                .sorted(Map.Entry.<MenuItem, Integer>comparingByValue().reversed())
                .limit(5)
                .collect(Collectors.toMap(
                        entry -> entry.getKey().getName(),
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        HashMap::new
                ));
    }
}