package com.wecp.medicalequipmentandtrackingsystem.controller;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Orders;
import com.wecp.medicalequipmentandtrackingsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SupplierController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/api/supplier/orders")
    public ResponseEntity<List<Orders>> getAllOrders() {
        // get all order and return it status code 200 OK
        return new ResponseEntity<List<Orders>>(orderService.getAllOrders(),HttpStatus.OK);
    }

    @PutMapping("/api/supplier/order/update/{orderId}")
    public ResponseEntity<Orders> updateOrderStatus(@PathVariable Long orderId, @RequestParam String newStatus) {
        // update order status and return updated order with status code 200 OK
        return new ResponseEntity<Orders>(orderService.updateOrderStatus(orderId, newStatus),HttpStatus.OK);
    }
}