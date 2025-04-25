package com.restaurant.service;

import com.restaurant.model.Category;
import com.restaurant.model.MenuItem;
import java.util.List;

public interface MenuService {
    // MenuItem operations
    void addMenuItem(MenuItem item);
    void updateMenuItem(MenuItem item);
    void removeMenuItem(int id);
    List<MenuItem> getAllMenuItems();
    List<MenuItem> getMenuItemsByCategory(Category category);
    MenuItem getMenuItemById(int id);

    // Category operations
    void addCategory(Category category);
    void updateCategory(Category category);
    void removeCategory(int id);
    Category getCategoryById(int id);
    List<Category> getAllCategories();
}