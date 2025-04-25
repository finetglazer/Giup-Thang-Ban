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

// src/api/menuItemApi.js
const API_BASE_URL = 'http://localhost:8080/api';

export const menuItemApi = {
    // Get all menu items
    getAllMenuItems: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/menu-items`);
            if (!response.ok) {
                throw new Error('Failed to fetch menu items');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching menu items:', error);
            throw error;
        }
    },

    // Get menu items by category
    getMenuItemsByCategory: async (categoryId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/menu-items/category/${categoryId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch menu items by category');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching menu items for category ${categoryId}:`, error);
            throw error;
        }
    },

    // Get menu item by ID
    getMenuItemById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/menu-items/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch menu item');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching menu item ${id}:`, error);
            throw error;
        }
    },

    // Create a new menu item
    createMenuItem: async (menuItemData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/menu-items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItemData),
            });
            if (!response.ok) {
                throw new Error('Failed to create menu item');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating menu item:', error);
            throw error;
        }
    },

    // Update an existing menu item
    updateMenuItem: async (id, menuItemData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/menu-items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItemData),
            });
            if (!response.ok) {
                throw new Error('Failed to update menu item');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error updating menu item ${id}:`, error);
            throw error;
        }
    },

    // Delete a menu item
    deleteMenuItem: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/menu-items/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete menu item');
            }
            return true;
        } catch (error) {
            console.error(`Error deleting menu item ${id}:`, error);
            throw error;
        }
    },
};