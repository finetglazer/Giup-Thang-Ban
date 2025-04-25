package com.restaurant.service;

import com.restaurant.dao.CategoryDAO;
import com.restaurant.dao.MenuItemDAO;
import com.restaurant.model.Category;
import com.restaurant.model.MenuItem;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

public class MenuServiceImpl implements MenuService {

    private final MenuItemDAO menuItemDAO;
    private final CategoryDAO categoryDAO;

    public MenuServiceImpl(MenuItemDAO menuItemDAO, CategoryDAO categoryDAO) {
        this.menuItemDAO = menuItemDAO;
        this.categoryDAO = categoryDAO;
    }

    @Override
    public void addMenuItem(MenuItem item) {
        try {
            menuItemDAO.add(item);
        } catch (SQLException e) {
            System.err.println("Error adding menu item: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void updateMenuItem(MenuItem item) {
        try {
            menuItemDAO.update(item);
        } catch (SQLException e) {
            System.err.println("Error updating menu item: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void removeMenuItem(int id) {
        try {
            menuItemDAO.delete(id);
        } catch (SQLException e) {
            System.err.println("Error removing menu item: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public List<MenuItem> getAllMenuItems() {
        try {
            return menuItemDAO.getAll();
        } catch (SQLException e) {
            System.err.println("Error getting all menu items: " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public List<MenuItem> getMenuItemsByCategory(Category category) {
        try {
            return menuItemDAO.getByCategory(category);
        } catch (SQLException e) {
            System.err.println("Error getting menu items by category: " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public void addCategory(Category category) {
        try {
            categoryDAO.add(category);
        } catch (SQLException e) {
            System.err.println("Error adding category: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void updateCategory(Category category) {
        try {
            categoryDAO.update(category);
        } catch (SQLException e) {
            System.err.println("Error updating category: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void removeCategory(int id) {
        try {
            categoryDAO.delete(id);
        } catch (SQLException e) {
            System.err.println("Error removing category: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public Category getCategoryById(int id) {
        try {
            return categoryDAO.getById(id);
        } catch (SQLException e) {
            System.err.println("Error getting category by id: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Category> getAllCategories() {
        try {
            return categoryDAO.getAll();
        } catch (SQLException e) {
            System.err.println("Error getting all categories: " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public MenuItem getMenuItemById(int id) {
        try {
            return menuItemDAO.getById(id);
        } catch (SQLException e) {
            System.err.println("Error getting menu item by id: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}