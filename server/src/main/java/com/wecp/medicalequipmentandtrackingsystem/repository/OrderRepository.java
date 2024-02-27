package com.wecp.medicalequipmentandtrackingsystem.repository;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByEquipmentId(Long equipmentId);
}
