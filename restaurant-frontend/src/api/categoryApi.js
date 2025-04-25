// src/api/categoryApi.js
const API_BASE_URL = 'http://localhost:8080/api';

export const categoryApi = {
    // Get all categories
    getAllCategories: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    // Get category by ID
    getCategoryById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch category');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching category ${id}:`, error);
            throw error;
        }
    },

    // Create a new category
    createCategory: async (categoryData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });
            if (!response.ok) {
                throw new Error('Failed to create category');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    },

    // Update an existing category
    updateCategory: async (id, categoryData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });
            if (!response.ok) {
                throw new Error('Failed to update category');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error updating category ${id}:`, error);
            throw error;
        }
    },

    // Delete a category
    deleteCategory: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete category');
            }
            return true;
        } catch (error) {
            console.error(`Error deleting category ${id}:`, error);
            throw error;
        }
    },
};