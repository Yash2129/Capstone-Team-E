package com.wecp.medicalequipmentandtrackingsystem.repository;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/*
***********************************************************************************
    Equipment repository interface for accessing Equipment entities in database          
***********************************************************************************
*/

@Repository // Declaring EquipmentRepository as an Repository interface
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    // Custom method to find all equipment belonging to specific hospital
    List<Equipment> findByHospitalId(Long hospitalId);

}
