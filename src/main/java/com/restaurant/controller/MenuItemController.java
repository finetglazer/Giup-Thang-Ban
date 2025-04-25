package com.restaurant.controller;

import com.restaurant.dao.CategoryDAO;
import com.restaurant.dao.CategoryDAOImpl;
import com.restaurant.dao.MenuItemDAO;
import com.restaurant.dao.MenuItemDAOImpl;
import com.restaurant.model.Category;
import com.restaurant.service.MenuService;
import com.restaurant.service.MenuServiceImpl;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/menu-items/*")
public class MenuItemController extends HttpServlet {
    private final Gson gson = new GsonBuilder().create();
    private MenuService menuService;

    @Override
    public void init() {
        CategoryDAO categoryDAO = new CategoryDAOImpl();
        MenuItemDAO menuItemDAO = new MenuItemDAOImpl(categoryDAO);
        menuService = new MenuServiceImpl(menuItemDAO, categoryDAO);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Enable CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                // Get all menu items
                List<MenuItem> menuItems = menuService.getAllMenuItems();
                out.print(gson.toJson(menuItems));
            } else if (pathInfo.startsWith("/category/")) {
                // Get menu items by category
                String[] parts = pathInfo.split("/");
                if (parts.length > 2) {
                    int categoryId = Integer.parseInt(parts[2]);
                    Category category = menuService.getCategoryById(categoryId);

                    if (category != null) {
                        List<MenuItem> menuItems = menuService.getMenuItemsByCategory(category);
                        out.print(gson.toJson(menuItems));
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print("{\"message\": \"Category not found\"}");
                    }
                }
            } else {
                // Get menu item by ID
                String[] parts = pathInfo.split("/");
                if (parts.length > 1) {
                    int id = Integer.parseInt(parts[1]);

                    // Note: MenuService doesn't have a getMenuItemById method, so we need to add it
                    // For now, we'll get all items and filter
                    List<MenuItem> allItems = menuService.getAllMenuItems();
                    MenuItem menuItem = allItems.stream()
                            .filter(item -> item.getId() == id)
                            .findFirst()
                            .orElse(null);

                    if (menuItem != null) {
                        out.print(gson.toJson(menuItem));
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print("{\"message\": \"Menu item not found\"}");
                    }
                }
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"message\": \"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Enable CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        PrintWriter out = response.getWriter();

        try {
            // Read request body
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                sb.append(line);
            }

            // Convert JSON to MenuItem object
            MenuItem menuItem = gson.fromJson(sb.toString(), MenuItem.class);

            // Add menu item
            menuService.addMenuItem(menuItem);

            // Return the newly created menu item
            out.print(gson.toJson(menuItem));
            response.setStatus(HttpServletResponse.SC_CREATED);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"message\": \"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Enable CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();

        if (pathInfo == null || pathInfo.equals("/")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"message\": \"Menu item ID is required\"}");
            return;
        }

        try {
            // Extract ID from path
            String[] parts = pathInfo.split("/");
            if (parts.length > 1) {
                int id = Integer.parseInt(parts[1]);

                // Read request body
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = request.getReader().readLine()) != null) {
                    sb.append(line);
                }

                // Convert JSON to MenuItem object
                MenuItem menuItem = gson.fromJson(sb.toString(), MenuItem.class);
                menuItem.setId(id);

                // Update menu item
                menuService.updateMenuItem(menuItem);

                // Return the updated menu item
                out.print(gson.toJson(menuItem));
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"message\": \"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Enable CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();

        if (pathInfo == null || pathInfo.equals("/")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"message\": \"Menu item ID is required\"}");
            return;
        }

        try {
            // Extract ID from path
            String[] parts = pathInfo.split("/");
            if (parts.length > 1) {
                int id = Integer.parseInt(parts[1]);

                // Delete menu item
                menuService.removeMenuItem(id);

                // Return success message
                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"message\": \"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) {
        // Enable CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
