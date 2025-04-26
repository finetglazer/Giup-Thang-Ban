package com.restaurant.dao;

import com.restaurant.model.Employee;
import com.restaurant.model.Order;
import com.restaurant.model.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OrderDAOImpl implements OrderDAO {

    private final DataSource dataSource;
    private final OrderItemDAO orderItemDAO;

    @Autowired
    public OrderDAOImpl(DataSource dataSource, OrderItemDAO orderItemDAO) {
        this.dataSource = dataSource;
        this.orderItemDAO = orderItemDAO;
    }

    @Override
    public void add(Order order) throws SQLException {
        String sql = "INSERT INTO orders (order_time, total_amount, status, employee_id) VALUES (?, ?, ?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setTimestamp(1, Timestamp.valueOf(order.getOrderTime()));
            stmt.setDouble(2, order.getTotalAmount());
            stmt.setString(3, order.getStatus());
            stmt.setInt(4, order.getCreatedBy().getId());

            int affectedRows = stmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Creating order failed, no rows affected.");
            }

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    order.setId(generatedKeys.getInt(1));

                    // Save order items
                    if (order.getItems() != null) {
                        for (OrderItem item : order.getItems()) {
                            orderItemDAO.add(item);
                        }
                    }
                } else {
                    throw new SQLException("Creating order failed, no ID obtained.");
                }
            }
        }
    }

    @Override
    public void update(Order order) throws SQLException {
        String sql = "UPDATE orders SET order_time = ?, total_amount = ?, status = ?, employee_id = ? WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setTimestamp(1, Timestamp.valueOf(order.getOrderTime()));
            stmt.setDouble(2, order.getTotalAmount());
            stmt.setString(3, order.getStatus());
            stmt.setInt(4, order.getCreatedBy().getId());
            stmt.setInt(5, order.getId());

            stmt.executeUpdate();

            // Update order items (simplistic approach - delete and re-add)
            List<OrderItem> currentItems = orderItemDAO.getByOrder(order);
            for (OrderItem item : currentItems) {
                orderItemDAO.delete(item.getId());
            }

            if (order.getItems() != null) {
                for (OrderItem item : order.getItems()) {
                    orderItemDAO.add(item);
                }
            }
        }
    }

    @Override
    public void delete(int id) throws SQLException {
        // First, get the order to delete its items
        Order order = getById(id);
        if (order != null) {
            // Delete all order items
            List<OrderItem> items = orderItemDAO.getByOrder(order);
            for (OrderItem item : items) {
                orderItemDAO.delete(item.getId());
            }

            // Then delete the order
            String sql = "DELETE FROM orders WHERE id = ?";
            try (Connection conn = dataSource.getConnection();
                 PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, id);
                stmt.executeUpdate();
            }
        }
    }

    @Override
    public Order getById(int id) throws SQLException {
        String sql = "SELECT o.id, o.order_time, o.total_amount, o.status, o.employee_id, " +
                "e.full_name, e.position " +
                "FROM orders o " +
                "JOIN employee e ON o.employee_id = e.id " +
                "WHERE o.id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    // Create employee
                    Employee employee = new Employee(
                            rs.getString("full_name"),
                            rs.getString("position")
                    );
                    employee.setId(rs.getInt("employee_id"));

                    // Create order without items
                    Order order = new Order(
                            rs.getInt("id"),
                            rs.getTimestamp("order_time").toLocalDateTime(),
                            new ArrayList<>(),
                            rs.getDouble("total_amount"),
                            rs.getString("status"),
                            employee
                    );

                    // Get order items
                    List<OrderItem> orderItems = orderItemDAO.getByOrder(order);
                    order.setItems(orderItems);

                    return order;
                }
                return null;
            }
        }
    }

    @Override
    public List<Order> getAll() throws SQLException {
        String sql = "SELECT o.id, o.order_time, o.total_amount, o.status, o.employee_id, " +
                "e.full_name, e.position " +
                "FROM orders o " +
                "JOIN employee e ON o.employee_id = e.id " +
                "ORDER BY o.order_time DESC";

        List<Order> orders = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                // Create employee
                Employee employee = new Employee(
                        rs.getString("full_name"),
                        rs.getString("position")
                );
                employee.setId(rs.getInt("employee_id"));

                // Create order without items initially
                Order order = new Order(
                        rs.getInt("id"),
                        rs.getTimestamp("order_time").toLocalDateTime(),
                        new ArrayList<>(),
                        rs.getDouble("total_amount"),
                        rs.getString("status"),
                        employee
                );

                // Get order items
                List<OrderItem> orderItems = orderItemDAO.getByOrder(order);
                order.setItems(orderItems);

                orders.add(order);
            }
        }

        return orders;
    }

    @Override
    public List<Order> getByDate(LocalDate date) throws SQLException {
        String sql = "SELECT o.id, o.order_time, o.total_amount, o.status, o.employee_id, " +
                "e.full_name, e.position " +
                "FROM orders o " +
                "JOIN employee e ON o.employee_id = e.id " +
                "WHERE DATE(o.order_time) = ? " +
                "ORDER BY o.order_time DESC";

        List<Order> orders = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setDate(1, Date.valueOf(date));

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    // Create employee
                    Employee employee = new Employee(
                            rs.getString("full_name"),
                            rs.getString("position")
                    );
                    employee.setId(rs.getInt("employee_id"));

                    // Create order without items initially
                    Order order = new Order(
                            rs.getInt("id"),
                            rs.getTimestamp("order_time").toLocalDateTime(),
                            new ArrayList<>(),
                            rs.getDouble("total_amount"),
                            rs.getString("status"),
                            employee
                    );

                    // Get order items
                    List<OrderItem> orderItems = orderItemDAO.getByOrder(order);
                    order.setItems(orderItems);

                    orders.add(order);
                }
            }
        }

        return orders;
    }
}