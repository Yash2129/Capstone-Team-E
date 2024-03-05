package com.wecp.medicalequipmentandtrackingsystem.repository;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/*
***********************************************************************************
    Order repository interface for accessing Equipment entities in database          
***********************************************************************************
*/

@Repository // Declaring OrderRepository as an Repository interface
public interface OrderRepository extends JpaRepository<Orders, Long> {

    // Custom method to find orders for the equipment
    List<Orders> findByEquipmentId(Long equipmentId);
}
