package com.restaurant.dto.revenue;

import java.util.List;

public class RevenueStatsDTO {
    private Double todayRevenue;
    private Double yesterdayRevenue;
    private Double weeklyRevenue;
    private Double monthlyRevenue;
    private Double dailyGrowth; // Percentage change from yesterday
    private List<TopSellingItemDTO> topSellingItems;

    public RevenueStatsDTO() {
    }

    public RevenueStatsDTO(Double todayRevenue, Double yesterdayRevenue, Double weeklyRevenue,
                           Double monthlyRevenue, Double dailyGrowth, List<TopSellingItemDTO> topSellingItems) {
        this.todayRevenue = todayRevenue;
        this.yesterdayRevenue = yesterdayRevenue;
        this.weeklyRevenue = weeklyRevenue;
        this.monthlyRevenue = monthlyRevenue;
        this.dailyGrowth = dailyGrowth;
        this.topSellingItems = topSellingItems;
    }

    public Double getTodayRevenue() {
        return todayRevenue;
    }

    public void setTodayRevenue(Double todayRevenue) {
        this.todayRevenue = todayRevenue;
    }

    public Double getYesterdayRevenue() {
        return yesterdayRevenue;
    }

    public void setYesterdayRevenue(Double yesterdayRevenue) {
        this.yesterdayRevenue = yesterdayRevenue;
    }

    public Double getWeeklyRevenue() {
        return weeklyRevenue;
    }

    public void setWeeklyRevenue(Double weeklyRevenue) {
        this.weeklyRevenue = weeklyRevenue;
    }

    public Double getMonthlyRevenue() {
        return monthlyRevenue;
    }

    public void setMonthlyRevenue(Double monthlyRevenue) {
        this.monthlyRevenue = monthlyRevenue;
    }

    public Double getDailyGrowth() {
        return dailyGrowth;
    }

    public void setDailyGrowth(Double dailyGrowth) {
        this.dailyGrowth = dailyGrowth;
    }

    public List<TopSellingItemDTO> getTopSellingItems() {
        return topSellingItems;
    }

    public void setTopSellingItems(List<TopSellingItemDTO> topSellingItems) {
        this.topSellingItems = topSellingItems;
    }
}
