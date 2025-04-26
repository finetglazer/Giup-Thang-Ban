package com.restaurant.controller;

import com.restaurant.dto.ApiResponse;
import com.restaurant.dto.OrderDTO;
import com.restaurant.model.Employee;
import com.restaurant.model.MenuItem;
import com.restaurant.model.Order;
import com.restaurant.model.OrderItem;
import com.restaurant.service.MenuService;
import com.restaurant.service.OrderService;
import com.restaurant.service.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderServiceImpl orderService;
    private final MenuService menuService;

    @Autowired
    public OrderController(OrderServiceImpl orderService, MenuService menuService) {
        this.orderService = orderService;
        this.menuService = menuService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderDTO>>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderDTO> orderDTOs = orders.stream()
                .map(OrderDTO::fromOrder)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("Orders fetched successfully", orderDTOs));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderDTO>> getOrderById(@PathVariable int id) {
        Order order = orderService.getOrderById(id);

        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Order not found with ID: " + id));
        }

        return ResponseEntity.ok(ApiResponse.success("Order fetched successfully", OrderDTO.fromOrder(order)));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<ApiResponse<List<OrderDTO>>> getOrdersByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<Order> orders = orderService.getOrdersByDate(date);
        List<OrderDTO> orderDTOs = orders.stream()
                .map(OrderDTO::fromOrder)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success(
                "Orders for date " + date.toString() + " fetched successfully", orderDTOs));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OrderDTO>> createOrder(@RequestBody CreateOrderRequest request) {
        try {
            // Create new order
            Order order = new Order();
            order.setOrderTime(LocalDateTime.now());
            order.setStatus("PENDING");

            // Set employee
            Employee employee = new Employee();
            employee.setId(request.getEmployeeId());
            order.setCreatedBy(employee);

            // Add order items
            List<OrderItem> orderItems = new ArrayList<>();
            for (OrderItemRequest itemRequest : request.getItems()) {
                MenuItem menuItem = menuService.getMenuItemById(itemRequest.getMenuItemId());

                if (menuItem != null) {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setMenuItem(menuItem);
                    orderItem.setQuantity(itemRequest.getQuantity());
                    orderItem.setPriceAtTimeOfOrder(menuItem.getPrice());
                    orderItem.setOrder(order);

                    orderItems.add(orderItem);
                }
            }

            order.setItems(orderItems);
            order.calculateTotal();

            // Save order
            orderService.createOrder(order);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Order created successfully", OrderDTO.fromOrder(order)));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error creating order: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderDTO>> updateOrder(
            @PathVariable int id,
            @RequestBody UpdateOrderRequest request) {

        try {
            Order existingOrder = orderService.getOrderById(id);

            if (existingOrder == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Order not found with ID: " + id));
            }

            // Update status if provided
            if (request.getStatus() != null) {
                existingOrder.setStatus(request.getStatus());
            }

            // Update items if provided
            if (request.getItems() != null) {
                existingOrder.clearItems();

                for (OrderItemRequest itemRequest : request.getItems()) {
                    MenuItem menuItem = menuService.getMenuItemById(itemRequest.getMenuItemId());

                    if (menuItem != null) {
                        OrderItem orderItem = new OrderItem();
                        orderItem.setMenuItem(menuItem);
                        orderItem.setQuantity(itemRequest.getQuantity());
                        orderItem.setPriceAtTimeOfOrder(menuItem.getPrice());
                        orderItem.setOrder(existingOrder);

                        existingOrder.addItem(orderItem);
                    }
                }
            }

            // Save updated order
            orderService.updateOrder(existingOrder);

            return ResponseEntity.ok(ApiResponse.success(
                    "Order updated successfully", OrderDTO.fromOrder(existingOrder)));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error updating order: " + e.getMessage()));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderDTO>> updateOrderStatus(
            @PathVariable int id,
            @RequestBody Map<String, String> request) {

        try {
            String newStatus = request.get("status");

            if (newStatus == null || newStatus.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Status cannot be empty"));
            }

            Order existingOrder = orderService.getOrderById(id);

            if (existingOrder == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Order not found with ID: " + id));
            }

            orderService.changeOrderStatus(id, newStatus);
            existingOrder = orderService.getOrderById(id); // Refresh order data

            return ResponseEntity.ok(ApiResponse.success(
                    "Order status updated successfully", OrderDTO.fromOrder(existingOrder)));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error updating order status: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteOrder(@PathVariable int id) {
        try {
            Order existingOrder = orderService.getOrderById(id);

            if (existingOrder == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Order not found with ID: " + id));
            }

            orderService.deleteOrder(id);

            return ResponseEntity.ok(ApiResponse.success("Order deleted successfully", null));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error deleting order: " + e.getMessage()));
        }
    }

    // Request classes
    static class CreateOrderRequest {
        private int employeeId;
        private List<OrderItemRequest> items;

        public int getEmployeeId() {
            return employeeId;
        }

        public void setEmployeeId(int employeeId) {
            this.employeeId = employeeId;
        }

        public List<OrderItemRequest> getItems() {
            return items;
        }

        public void setItems(List<OrderItemRequest> items) {
            this.items = items;
        }
    }

    static class UpdateOrderRequest {
        private String status;
        private List<OrderItemRequest> items;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public List<OrderItemRequest> getItems() {
            return items;
        }

        public void setItems(List<OrderItemRequest> items) {
            this.items = items;
        }
    }

    static class OrderItemRequest {
        private int menuItemId;
        private int quantity;

        public int getMenuItemId() {
            return menuItemId;
        }

        public void setMenuItemId(int menuItemId) {
            this.menuItemId = menuItemId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}