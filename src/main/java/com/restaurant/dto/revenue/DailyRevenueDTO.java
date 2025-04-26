package com.restaurant.dto.revenue;

import java.time.LocalDate;

public class DailyRevenueDTO {
    private LocalDate date;
    private Double revenue;

    public DailyRevenueDTO() {
    }

    public DailyRevenueDTO(LocalDate date, Double revenue) {
        this.date = date;
        this.revenue = revenue;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }
}
