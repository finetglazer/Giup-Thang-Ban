// src/api/menuViewApi.js
const API_BASE_URL = 'http://localhost:8080/api';

export const menuViewApi = {
    // Get all available menu items grouped by category
    getMenuItemsGroupedByCategory: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/menu-view`);
            if (!response.ok) {
                throw new Error('Failed to fetch menu items');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching menu items:', error);
            throw error;
        }
    },

    // Get available menu items in a specific category
    getAvailableMenuItemsByCategory: async (categoryId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/menu-view/category/${categoryId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch menu items by category');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error(`Error fetching menu items for category ${categoryId}:`, error);
            throw error;
        }
    }
};