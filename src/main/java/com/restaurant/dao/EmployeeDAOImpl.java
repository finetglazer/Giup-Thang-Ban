package com.restaurant.dao;

import com.restaurant.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class EmployeeDAOImpl implements EmployeeDAO {

    private final DataSource dataSource;

    @Autowired
    public EmployeeDAOImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void add(Employee employee) throws SQLException {
        String sql = "INSERT INTO employee (full_name, position) VALUES (?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, employee.getFullName());
            stmt.setString(2, employee.getPosition());

            int affectedRows = stmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Creating employee failed, no rows affected.");
            }

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    employee.setId(generatedKeys.getInt(1));
                } else {
                    throw new SQLException("Creating employee failed, no ID obtained.");
                }
            }
        }
    }

    @Override
    public void update(Employee employee) throws SQLException {
        String sql = "UPDATE employee SET full_name = ?, position = ? WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, employee.getFullName());
            stmt.setString(2, employee.getPosition());
            stmt.setInt(3, employee.getId());

            stmt.executeUpdate();
        }
    }

    @Override
    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM employee WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    @Override
    public Employee getById(int id) throws SQLException {
        String sql = "SELECT id, full_name, position FROM employee WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Employee employee = new Employee(
                            rs.getString("full_name"),
                            rs.getString("position")
                    );
                    employee.setId(rs.getInt("id"));
                    return employee;
                }
                return null;
            }
        }
    }

    @Override
    public List<Employee> getAll() throws SQLException {
        String sql = "SELECT id, full_name, position FROM employee";
        List<Employee> employees = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Employee employee = new Employee(
                        rs.getString("full_name"),
                        rs.getString("position")
                );
                employee.setId(rs.getInt("id"));
                employees.add(employee);
            }
        }

        return employees;
    }
}