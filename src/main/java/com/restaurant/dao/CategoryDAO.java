package com.restaurant.dao;

import com.restaurant.model.Category;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public interface CategoryDAO {
    void add(Category category) throws SQLException;
    void update(Category category) throws SQLException;
    void delete(int id) throws SQLException;
    Category getById(int id) throws SQLException;
    List<Category> getAll() throws SQLException;
}