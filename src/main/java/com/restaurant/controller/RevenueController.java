package com.restaurant.controller;

import com.restaurant.dto.ApiResponse;
import com.restaurant.dto.revenue.DailyRevenueDTO;
import com.restaurant.dto.revenue.RevenueStatsDTO;
import com.restaurant.dto.revenue.TopSellingItemDTO;
import com.restaurant.model.MenuItem;
import com.restaurant.service.RevenueServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/statistics")
public class RevenueController {

    private final RevenueServiceImpl revenueService;

    @Autowired
    public RevenueController(RevenueServiceImpl revenueService) {
        this.revenueService = revenueService;
    }

    @GetMapping("/daily")
    public ResponseEntity<ApiResponse<Double>> getDailyRevenue(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        double revenue = revenueService.getDailyRevenue(date);
        return ResponseEntity.ok(ApiResponse.success("Daily revenue fetched successfully", revenue));
    }

    @GetMapping("/weekly")
    public ResponseEntity<ApiResponse<Double>> getWeeklyRevenue(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {

        double revenue = revenueService.getWeeklyRevenue(startDate);
        return ResponseEntity.ok(ApiResponse.success("Weekly revenue fetched successfully", revenue));
    }

    @GetMapping("/monthly")
    public ResponseEntity<ApiResponse<Double>> getMonthlyRevenue(
            @RequestParam int year,
            @RequestParam int month) {

        double revenue = revenueService.getMonthlyRevenue(year, month);
        return ResponseEntity.ok(ApiResponse.success("Monthly revenue fetched successfully", revenue));
    }

    @GetMapping("/top-selling")
    public ResponseEntity<ApiResponse<List<TopSellingItemDTO>>> getTopSellingItems(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        Map<MenuItem, Integer> topItems = revenueService.getTopSellingItems(startDate, endDate);

        // Convert to DTO and sort by quantity descending
        List<TopSellingItemDTO> topItemsList = topItems.entrySet().stream()
                .map(entry -> new TopSellingItemDTO(
                        entry.getKey().getId(),
                        entry.getKey().getName(),
                        entry.getValue(),
                        entry.getKey().getPrice() * entry.getValue()
                ))
                .sorted((item1, item2) -> item2.getQuantity().compareTo(item1.getQuantity()))
                .limit(10) // Get top 10 items
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("Top selling items fetched successfully", topItemsList));
    }

    @GetMapping("/daily-range")
    public ResponseEntity<ApiResponse<List<DailyRevenueDTO>>> getDailyRevenueForRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        Map<LocalDate, Double> dailyRevenue = revenueService.getDailyRevenueForRange(startDate, endDate);

        // Convert to DTO list
        List<DailyRevenueDTO> revenueList = dailyRevenue.entrySet().stream()
                .map(entry -> new DailyRevenueDTO(entry.getKey(), entry.getValue()))
                .sorted((dto1, dto2) -> dto1.getDate().compareTo(dto2.getDate()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("Daily revenue for range fetched successfully", revenueList));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<RevenueStatsDTO>> getDashboardStats() {
        // Get current date
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        LocalDate weekStart = today.minusDays(6); // Last 7 days
        LocalDate monthStart = today.withDayOfMonth(1); // Start of current month

        // Calculate daily, weekly and monthly revenue
        double todayRevenue = revenueService.getDailyRevenue(today);
        double yesterdayRevenue = revenueService.getDailyRevenue(yesterday);
        double weeklyRevenue = revenueService.getWeeklyRevenue(weekStart);
        double monthlyRevenue = revenueService.getMonthlyRevenue(today.getYear(), today.getMonthValue());

        // Get top 5 selling items for current month
        Map<String, Integer> topItems = revenueService.getTop5SellingItems(monthStart, today);
        List<TopSellingItemDTO> topItemsList = new ArrayList<>();

        topItems.forEach((name, quantity) -> {
            TopSellingItemDTO dto = new TopSellingItemDTO();
            dto.setName(name);
            dto.setQuantity(quantity);
            topItemsList.add(dto);
        });

        // Create response DTO
        RevenueStatsDTO stats = new RevenueStatsDTO(
                todayRevenue,
                yesterdayRevenue,
                weeklyRevenue,
                monthlyRevenue,
                // Calculate percentage change from yesterday
                calculatePercentageChange(todayRevenue, yesterdayRevenue),
                topItemsList
        );

        return ResponseEntity.ok(ApiResponse.success("Dashboard statistics fetched successfully", stats));
    }

    // Helper method to calculate percentage change
    private double calculatePercentageChange(double current, double previous) {
        if (previous == 0) {
            return current > 0 ? 100.0 : 0.0;
        }
        return ((current - previous) / previous) * 100.0;
    }
}