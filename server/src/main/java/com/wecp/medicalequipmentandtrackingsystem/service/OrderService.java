package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Orders;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {



    @Autowired
    private OrderRepository orderRepository;
    public Orders placeOrder(Long equipmentId, Orders order) {
        // Check if the equipment with the given ID exists
        // place order for the equipment
        Orders fetchedOrder = orderRepository.findById(equipmentId).get();
        if(fetchedOrder!=null){
            return fetchedOrder;
        }
        return null;
    }

    public List<Orders> getAllOrders() {
        // return all orders
        return orderRepository.findAll();
    }

    public Orders updateOrderStatus(Long orderId, String newStatus) {
       // update order status
       Orders order = orderRepository.findById(orderId).get();
        if (order !=null) {
         order.setStatus(newStatus);
         return orderRepository.save(order);

        }else{return null;}
    }
}