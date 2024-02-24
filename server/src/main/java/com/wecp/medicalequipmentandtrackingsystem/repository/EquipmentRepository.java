package com.wecp.medicalequipmentandtrackingsystem.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment,Long>{
    // extent jpa repository and add custom methods if needed

}
