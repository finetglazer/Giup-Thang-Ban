package com.restaurant.service;

import com.restaurant.model.Category;
import com.restaurant.model.MenuItem;
import java.util.List;

public interface MenuService {
    void addMenuItem(MenuItem item);
    void updateMenuItem(MenuItem item);
    void removeMenuItem(int id);
    List<MenuItem> getAllMenuItems();
    List<MenuItem> getMenuItemsByCategory(Category category);
}
