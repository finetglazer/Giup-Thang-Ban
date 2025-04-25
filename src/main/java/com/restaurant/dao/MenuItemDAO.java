package com.restaurant.dao;

import com.restaurant.model.Category;
import com.restaurant.model.MenuItem;
import java.sql.SQLException;
import java.util.List;

public interface MenuItemDAO {
    void add(MenuItem menuItem) throws SQLException;
    void update(MenuItem menuItem) throws SQLException;
    void delete(int id) throws SQLException;
    MenuItem getById(int id) throws SQLException;
    List<MenuItem> getAll() throws SQLException;
    List<MenuItem> getByCategory(Category category) throws SQLException;
}