package com.restaurant.service;

import com.restaurant.dao.CategoryDAO;
import com.restaurant.dao.MenuItemDAO;
import com.restaurant.model.Category;
import com.restaurant.model.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    private final MenuItemDAO menuItemDAO;
    private final CategoryDAO categoryDAO;

    @Autowired
    public MenuServiceImpl(MenuItemDAO menuItemDAO, CategoryDAO categoryDAO) {
        this.menuItemDAO = menuItemDAO;
        this.categoryDAO = categoryDAO;
    }

    @Override
    public void addMenuItem(MenuItem item) {
        try {
            menuItemDAO.add(item);
        } catch (SQLException e) {
            throw new RuntimeException("Error adding menu item: " + e.getMessage(), e);
        }
    }

    @Override
    public void updateMenuItem(MenuItem item) {
        try {
            menuItemDAO.update(item);
        } catch (SQLException e) {
            throw new RuntimeException("Error updating menu item: " + e.getMessage(), e);
        }
    }

    @Override
    public void removeMenuItem(int id) {
        try {
            menuItemDAO.delete(id);
        } catch (SQLException e) {
            throw new RuntimeException("Error removing menu item: " + e.getMessage(), e);
        }
    }

    @Override
    public List<MenuItem> getAllMenuItems() {
        try {
            return menuItemDAO.getAll();
        } catch (SQLException e) {
            throw new RuntimeException("Error getting all menu items: " + e.getMessage(), e);
        }
    }

    @Override
    public List<MenuItem> getMenuItemsByCategory(Category category) {
        try {
            return menuItemDAO.getByCategory(category);
        } catch (SQLException e) {
            throw new RuntimeException("Error getting menu items by category: " + e.getMessage(), e);
        }
    }

    @Override
    public MenuItem getMenuItemById(int id) {
        try {
            return menuItemDAO.getById(id);
        } catch (SQLException e) {
            throw new RuntimeException("Error getting menu item by id: " + e.getMessage(), e);
        }
    }

    @Override
    public void addCategory(Category category) {
        try {
            categoryDAO.add(category);
        } catch (SQLException e) {
            throw new RuntimeException("Error adding category: " + e.getMessage(), e);
        }
    }

    @Override
    public void updateCategory(Category category) {
        try {
            categoryDAO.update(category);
        } catch (SQLException e) {
            throw new RuntimeException("Error updating category: " + e.getMessage(), e);
        }
    }

    @Override
    public void removeCategory(int id) {
        try {
            categoryDAO.delete(id);
        } catch (SQLException e) {
            throw new RuntimeException("Error removing category: " + e.getMessage(), e);
        }
    }

    @Override
    public Category getCategoryById(int id) {
        try {
            return categoryDAO.getById(id);
        } catch (SQLException e) {
            throw new RuntimeException("Error getting category by id: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Category> getAllCategories() {
        try {
            return categoryDAO.getAll();
        } catch (SQLException e) {
            throw new RuntimeException("Error getting all categories: " + e.getMessage(), e);
        }
    }
}