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

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    public Orders placeOrder(Long equipmentId, Orders order) {
        // Check if the equipment with the given ID exists
        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new EquipmentNotFoundException("Equipment not found with ID: " + equipmentId));

        order.setEquipment(equipment);
        order.setOrderDate(new Date());
        order.setStatus("Initiated");

        // Save the order
        return orderRepository.save(order);
    }

    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

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
