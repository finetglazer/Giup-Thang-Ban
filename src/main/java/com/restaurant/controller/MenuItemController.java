package com.restaurant.controller;

import com.restaurant.model.Category;
import com.restaurant.model.MenuItem;
import com.restaurant.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    private final MenuService menuService;

    @Autowired
    public MenuItemController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        List<MenuItem> menuItems = menuService.getAllMenuItems();
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable int id) {
        MenuItem menuItem = menuService.getMenuItemById(id);
        if (menuItem == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(menuItem);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<MenuItem>> getMenuItemsByCategory(@PathVariable int categoryId) {
        Category category = menuService.getCategoryById(categoryId);

        if (category == null) {
            return ResponseEntity.notFound().build();
        }

        List<MenuItem> menuItems = menuService.getMenuItemsByCategory(category);
        return ResponseEntity.ok(menuItems);
    }

    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItem menuItem) {
        menuService.addMenuItem(menuItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(menuItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable int id, @RequestBody MenuItem menuItem) {
        MenuItem existingMenuItem = menuService.getMenuItemById(id);
        if (existingMenuItem == null) {
            return ResponseEntity.notFound().build();
        }

        menuItem.setId(id);
        menuService.updateMenuItem(menuItem);
        return ResponseEntity.ok(menuItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable int id) {
        MenuItem existingMenuItem = menuService.getMenuItemById(id);
        if (existingMenuItem == null) {
            return ResponseEntity.notFound().build();
        }

        menuService.removeMenuItem(id);
        return ResponseEntity.noContent().build();
    }
}