package com.restaurant.dao;

import com.restaurant.model.Category;
import com.restaurant.model.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MenuItemDAOImpl implements MenuItemDAO {

    private final DataSource dataSource;
    private final CategoryDAO categoryDAO;

    @Autowired
    public MenuItemDAOImpl(DataSource dataSource, CategoryDAO categoryDAO) {
        this.dataSource = dataSource;
        this.categoryDAO = categoryDAO;
    }

    @Override
    public void add(MenuItem menuItem) throws SQLException {
        String sql = "INSERT INTO menu_item (name, price, description, category_id, is_available) VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, menuItem.getName());
            stmt.setDouble(2, menuItem.getPrice());
            stmt.setString(3, menuItem.getDescription());
            stmt.setInt(4, menuItem.getCategory().getId());
            stmt.setBoolean(5, menuItem.isAvailable());

            int affectedRows = stmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Creating menu item failed, no rows affected.");
            }

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    menuItem.setId(generatedKeys.getInt(1));
                } else {
                    throw new SQLException("Creating menu item failed, no ID obtained.");
                }
            }
        }
    }

    @Override
    public void update(MenuItem menuItem) throws SQLException {
        String sql = "UPDATE menu_item SET name = ?, price = ?, description = ?, category_id = ?, is_available = ? WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, menuItem.getName());
            stmt.setDouble(2, menuItem.getPrice());
            stmt.setString(3, menuItem.getDescription());
            stmt.setInt(4, menuItem.getCategory().getId());
            stmt.setBoolean(5, menuItem.isAvailable());
            stmt.setInt(6, menuItem.getId());

            stmt.executeUpdate();
        }
    }

    @Override
    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM menu_item WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    @Override
    public MenuItem getById(int id) throws SQLException {
        String sql = "SELECT id, name, price, description, category_id, is_available FROM menu_item WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Category category = categoryDAO.getById(rs.getInt("category_id"));

                    return new MenuItem(
                            rs.getInt("id"),
                            rs.getString("name"),
                            rs.getDouble("price"),
                            rs.getString("description"),
                            category,
                            rs.getBoolean("is_available")
                    );
                }
                return null;
            }
        }
    }

    @Override
    public List<MenuItem> getAll() throws SQLException {
        String sql = "SELECT id, name, price, description, category_id, is_available FROM menu_item";
        List<MenuItem> menuItems = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Category category = categoryDAO.getById(rs.getInt("category_id"));

                menuItems.add(new MenuItem(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getDouble("price"),
                        rs.getString("description"),
                        category,
                        rs.getBoolean("is_available")
                ));
            }
        }

        return menuItems;
    }

    @Override
    public List<MenuItem> getByCategory(Category category) throws SQLException {
        String sql = "SELECT id, name, price, description, category_id, is_available FROM menu_item WHERE category_id = ?";
        List<MenuItem> menuItems = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, category.getId());

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    menuItems.add(new MenuItem(
                            rs.getInt("id"),
                            rs.getString("name"),
                            rs.getDouble("price"),
                            rs.getString("description"),
                            category,
                            rs.getBoolean("is_available")
                    ));
                }
            }
        }

        return menuItems;
    }
}