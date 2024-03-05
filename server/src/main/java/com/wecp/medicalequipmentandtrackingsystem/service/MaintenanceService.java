package com.wecp.medicalequipmentandtrackingsystem.service;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wecp.medicalequipmentandtrackingsystem.exceptions.MaintenanceNotFoundException;
import com.wecp.medicalequipmentandtrackingsystem.exceptions.EquipmentNotFoundException;
import java.util.List;

/*
***************************************************************
    Maintenance service class for managing Equipment entities        
****************************************************************
*/

@Service // Service class for managing Maintenance entities
public class MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceRepository; // Repository for accessing Maintenance entities
    @Autowired
    private EquipmentRepository equipmentRepository; // Repository for accessing Equipment entities

    // Method to get the list of Maintenances
    public List<Maintenance> getAllMaintenance() {
        // Retriving the maintenances
        return maintenanceRepository.findAll();
    }

    // Method to add the the maintenance
    public Maintenance scheduleMaintenance(Long equipmentId, Maintenance maintenance) {
        // Find the maintenance by equipmentId
        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new EquipmentNotFoundException("Equipment not found with ID: " + equipmentId));
        // Set the equipment for the maintenance task
        maintenance.setEquipment(equipment);
        // Save the maintenance in the databases
        return maintenanceRepository.save(maintenance);
    }

    // Method to update the maintenance
    public Maintenance updateMaintenance(Long maintenanceId, Maintenance updatedMaintenance) {
        // Check if the maintenance record with the given ID exists
        Maintenance existingMaintenance = maintenanceRepository.findById(maintenanceId)
                .orElseThrow(() -> new MaintenanceNotFoundException("Maintenance record not found with ID: " + maintenanceId));
        // Set the equipment and id for the maintenance task
        updatedMaintenance.setId(existingMaintenance.getId());
        updatedMaintenance.setEquipment(existingMaintenance.getEquipment());
        // Save the updated maintenance record
        return maintenanceRepository.save(updatedMaintenance);
    }
}