package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceService {
    @Autowired
    private MaintenanceRepository maintenanceRepository;
    private EquipmentRepository equipmentRepository;
    public List<Maintenance> getAllMaintenance() {
        // get all maintenance records
        return maintenanceRepository.findAll();
    }

    public Maintenance scheduleMaintenance(Long equipmentId, Maintenance maintenance) {
        // Check if the equipment with the given ID exists
        // schedule maintenance for the equipment
        Optional<Equipment> equipments = equipmentRepository.findById(equipmentId);
        if (equipments.isPresent()) {
           // return accounts.get();
         maintenanceRepository.save(maintenance);
         return maintenance;

        }
        else {
            return null;
           // throw new AccountNotFoundException("No accounts found linked with this accountId");
        }
    }


    public Maintenance updateMaintenance(Long maintenanceId, Maintenance updatedMaintenance) {
        // Check if the maintenance record with the given ID exists
        Optional<Maintenance> maintenance = maintenanceRepository.findById(maintenanceId);
        if (maintenance.isPresent()) {
         
         return maintenanceRepository.save(updatedMaintenance);

        }else{return null;}
        // update maintenance record
    }
}