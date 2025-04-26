// src/api/statisticsApi.js
const API_BASE_URL = 'http://localhost:8080/api';

export const statisticsApi = {
    // Get dashboard statistics
    getDashboardStats: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/statistics/dashboard`);
            if (!response.ok) {
                throw new Error('Failed to fetch dashboard statistics');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching dashboard statistics:', error);
            throw error;
        }
    },

    // Get daily revenue for a specific date
    getDailyRevenue: async (date) => {
        try {
            const response = await fetch(`${API_BASE_URL}/statistics/daily?date=${date}`);
            if (!response.ok) {
                throw new Error('Failed to fetch daily revenue');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error(`Error fetching daily revenue for ${date}:`, error);
            throw error;
        }
    },

    // Get daily revenue for a date range
    getDailyRevenueRange: async (startDate, endDate) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/statistics/daily-range?startDate=${startDate}&endDate=${endDate}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch daily revenue range');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching daily revenue range:', error);
            throw error;
        }
    },

    // Get weekly revenue starting from a date
    getWeeklyRevenue: async (startDate) => {
        try {
            const response = await fetch(`${API_BASE_URL}/statistics/weekly?startDate=${startDate}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weekly revenue');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error(`Error fetching weekly revenue from ${startDate}:`, error);
            throw error;
        }
    },

    // Get monthly revenue for a specific year and month
    getMonthlyRevenue: async (year, month) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/statistics/monthly?year=${year}&month=${month}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch monthly revenue');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error(`Error fetching monthly revenue for ${month}/${year}:`, error);
            throw error;
        }
    },

    // Get top selling items for a date range
    getTopSellingItems: async (startDate, endDate) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/statistics/top-selling?startDate=${startDate}&endDate=${endDate}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch top selling items');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching top selling items:', error);
            throw error;
        }
    }
};