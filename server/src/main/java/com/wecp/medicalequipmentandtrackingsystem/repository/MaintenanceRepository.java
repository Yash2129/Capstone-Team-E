package com.wecp.medicalequipmentandtrackingsystem.repository;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/*
***********************************************************************************
    Maintenance repository interface for accessing Equipment entities in database          
***********************************************************************************
*/

@Repository // Declaring MaintenanceRepository as an Repository interface
public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {

    // Custom method to find maintenance for the equipments
    List<Maintenance> findByEquipmentId(Long equipmentId);
}
