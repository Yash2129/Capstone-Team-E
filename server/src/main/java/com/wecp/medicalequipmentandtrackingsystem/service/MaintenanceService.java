package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;


public class MaintenanceService {
    public List<Maintenance> getAllMaintenance() {
        // get all maintenance records
    }

    public Maintenance scheduleMaintenance(Long equipmentId, Maintenance maintenance) {
        // Check if the equipment with the given ID exists
        // schedule maintenance for the equipment
    }


    public Maintenance updateMaintenance(Long maintenanceId, Maintenance updatedMaintenance) {
        // Check if the maintenance record with the given ID exists

        // update maintenance record
    }
}
