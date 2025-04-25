package com.restaurant.service;

import com.restaurant.model.MenuItem;

import java.time.LocalDate;
import java.util.Map;

public interface RevenueService {
    double getDailyRevenue(LocalDate date);
    double getWeeklyRevenue(LocalDate startDate);
    double getMonthlyRevenue(int year, int month);
    Map<MenuItem, Integer> getTopSellingItems(LocalDate startDate, LocalDate endDate);
}