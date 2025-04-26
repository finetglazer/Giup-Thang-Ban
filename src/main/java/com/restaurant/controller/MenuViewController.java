package com.restaurant.controller;

import com.restaurant.dto.ApiResponse;
import com.restaurant.model.Category;
import com.restaurant.model.MenuItem;
import com.restaurant.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Controller specifically for staff to view menu items for order creation
 */
@RestController
@RequestMapping("/api/menu-view")
public class MenuViewController {

    private final MenuService menuService;

    @Autowired
    public MenuViewController(MenuService menuService) {
        this.menuService = menuService;
    }

    /**
     * Get all available menu items grouped by category
     * @return Map of category names to lists of menu items
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, List<MenuItem>>>> getMenuItemsByCategory() {
        List<MenuItem> allItems = menuService.getAllMenuItems();

        // Filter to only show available items
        List<MenuItem> availableItems = allItems.stream()
                .filter(MenuItem::isAvailable)
                .collect(Collectors.toList());

        // Group by category
        Map<String, List<MenuItem>> itemsByCategory = availableItems.stream()
                .collect(Collectors.groupingBy(
                        item -> item.getCategory().getName(),
                        Collectors.toList()
                ));

        return ResponseEntity.ok(ApiResponse.success("Menu items fetched successfully", itemsByCategory));
    }

    /**
     * Get all available menu items in a specific category
     * @param categoryId ID of the category
     * @return List of menu items in the category
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<MenuItem>>> getAvailableMenuItemsByCategory(@PathVariable int categoryId) {
        Category category = menuService.getCategoryById(categoryId);

        if (category == null) {
            return ResponseEntity.ok(ApiResponse.error("Category not found"));
        }

        List<MenuItem> menuItems = menuService.getMenuItemsByCategory(category)
                .stream()
                .filter(MenuItem::isAvailable)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("Menu items fetched successfully", menuItems));
    }
}