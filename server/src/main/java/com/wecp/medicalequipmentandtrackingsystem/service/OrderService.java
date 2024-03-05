package com.wecp.medicalequipmentandtrackingsystem.service;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Orders;
import com.wecp.medicalequipmentandtrackingsystem.exceptions.EquipmentNotFoundException;
import com.wecp.medicalequipmentandtrackingsystem.exceptions.OrderNotFoundException;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

/*
***************************************************************
    Order service class for managing Equipment entities        
****************************************************************
*/

@Service // Service class for managing Order entities
public class OrderService {

    @Autowired
    private OrderRepository orderRepository; // Repository for accessing Order entities
    @Autowired
    private EquipmentRepository equipmentRepository; // Repository for accessing Equipment entities

    // Method to get the list of orders
    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    // Method to add the order
    public Orders placeOrder(Long equipmentId, Orders order) {
        // Check if the equipment with the given ID exists
        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new EquipmentNotFoundException("Equipment not found with ID: " + equipmentId));
        // Set the equipment for the maintenance task
        order.setEquipment(equipment);
        order.setOrderDate(new Date());
        order.setStatus("Initiated");
        // Save the order in the database
        return orderRepository.save(order);
    }

    // Method to update the order status
    public Orders updateOrderStatus(Long orderId, String newStatus) {
        // Check if the order with the given ID exists
        Orders existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID: " + orderId));
        // Update the order status
        existingOrder.setStatus(newStatus);
        // Save the updated order
        return orderRepository.save(existingOrder);
    }
}
