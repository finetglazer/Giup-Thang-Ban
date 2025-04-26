package com.restaurant.dao;

import com.restaurant.model.MenuItem;
import com.restaurant.model.Order;
import com.restaurant.model.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OrderItemDAOImpl implements OrderItemDAO {

    private final DataSource dataSource;
    private final MenuItemDAO menuItemDAO;

    @Autowired
    public OrderItemDAOImpl(DataSource dataSource, MenuItemDAO menuItemDAO) {
        this.dataSource = dataSource;
        this.menuItemDAO = menuItemDAO;
    }

    @Override
    public void add(OrderItem orderItem) throws SQLException {
        String sql = "INSERT INTO order_item (order_id, menu_item_id, quantity, price_at_time_of_order) VALUES (?, ?, ?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, orderItem.getOrder().getId());
            stmt.setInt(2, orderItem.getMenuItem().getId());
            stmt.setInt(3, orderItem.getQuantity());
            stmt.setDouble(4, orderItem.getPriceAtTimeOfOrder());

            int affectedRows = stmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Creating order item failed, no rows affected.");
            }

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    orderItem.setId(generatedKeys.getInt(1));
                } else {
                    throw new SQLException("Creating order item failed, no ID obtained.");
                }
            }
        }
    }

    @Override
    public void update(OrderItem orderItem) throws SQLException {
        String sql = "UPDATE order_item SET order_id = ?, menu_item_id = ?, quantity = ?, price_at_time_of_order = ? WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, orderItem.getOrder().getId());
            stmt.setInt(2, orderItem.getMenuItem().getId());
            stmt.setInt(3, orderItem.getQuantity());
            stmt.setDouble(4, orderItem.getPriceAtTimeOfOrder());
            stmt.setInt(5, orderItem.getId());

            stmt.executeUpdate();
        }
    }

    @Override
    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM order_item WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    @Override
    public OrderItem getById(int id) throws SQLException {
        String sql = "SELECT oi.id, oi.order_id, oi.menu_item_id, oi.quantity, oi.price_at_time_of_order " +
                "FROM order_item oi WHERE oi.id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    MenuItem menuItem = menuItemDAO.getById(rs.getInt("menu_item_id"));

                    // Create a minimal order object (we don't need the full order)
                    Order order = new Order();
                    order.setId(rs.getInt("order_id"));

                    return new OrderItem(
                            rs.getInt("id"),
                            menuItem,
                            rs.getInt("quantity"),
                            rs.getDouble("price_at_time_of_order")
                    );
                }
                return null;
            }
        }
    }

    @Override
    public List<OrderItem> getByOrder(Order order) throws SQLException {
        String sql = "SELECT oi.id, oi.order_id, oi.menu_item_id, oi.quantity, oi.price_at_time_of_order " +
                "FROM order_item oi WHERE oi.order_id = ?";

        List<OrderItem> orderItems = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, order.getId());

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    MenuItem menuItem = menuItemDAO.getById(rs.getInt("menu_item_id"));

                    OrderItem orderItem = new OrderItem(
                            rs.getInt("id"),
                            menuItem,
                            rs.getInt("quantity"),
                            rs.getDouble("price_at_time_of_order")
                    );

                    // Set the order reference (needed for bidirectional relationship)
                    orderItem.setOrder(order);

                    orderItems.add(orderItem);
                }
            }
        }

        return orderItems;
    }
}