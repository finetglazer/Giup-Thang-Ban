package com.restaurant.service;

import com.restaurant.model.Category;
import com.restaurant.model.MenuItem;
import java.util.List;

public interface MenuService {
    // Existing methods
    void addMenuItem(MenuItem item);
    void updateMenuItem(MenuItem item);
    void removeMenuItem(int id);
    List<MenuItem> getAllMenuItems();
    List<MenuItem> getMenuItemsByCategory(Category category);

    // Missing methods that need to be added
    void addCategory(Category category);
    void updateCategory(Category category);
    void removeCategory(int id);
    Category getCategoryById(int id);
    List<Category> getAllCategories();
    MenuItem getMenuItemById(int id); // Optional improvement
}