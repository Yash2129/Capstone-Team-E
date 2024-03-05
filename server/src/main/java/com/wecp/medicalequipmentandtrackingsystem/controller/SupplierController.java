package com.wecp.medicalequipmentandtrackingsystem.controller;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Orders;
import com.wecp.medicalequipmentandtrackingsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/*
*************************************************************************
    Supplier controller class for managing hospital related endpoints        
*************************************************************************
*/

@RestController
public class SupplierController {

    @Autowired
    private OrderService orderService; // Instance variable that holds a reference to an OrderService object

    @GetMapping("/api/supplier/orders") // Endpoint to get the list of orders
    public ResponseEntity<List<Orders>> getAllOrders() {
        // Getting the orders
        List<Orders> orders = orderService.getAllOrders();
        // Returning response
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/api/supplier/order/update/{orderId}") // Endpoint to update the order status
    public ResponseEntity<Orders> updateOrderStatus(@PathVariable Long orderId, @RequestParam String newStatus) {
        // Updating the status using orderId 
        Orders updatedOrder = orderService.updateOrderStatus(orderId, newStatus);
        // Returning response
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }
}