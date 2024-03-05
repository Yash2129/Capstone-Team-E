package com.wecp.medicalequipmentandtrackingsystem.controller;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/*
*************************************************************************
    Technician controller class for managing hospital related endpoints        
*************************************************************************
*/

@RestController
public class TechnicianController {

    @Autowired
    public MaintenanceService maintenanceService; // Instance variable that holds a reference to an MaintenanceService object

    @GetMapping("/api/technician/maintenance") // Endpoint to get the list of maintenance
    public ResponseEntity<List<Maintenance>> getAllMaintenance() {
        // Getting the list
        List<Maintenance> maintenances = maintenanceService.getAllMaintenance();
        // Returning response
        return new ResponseEntity<>(maintenances, HttpStatus.OK);
    }

    @PutMapping("/api/technician/maintenance/update/{maintenanceId}") // Endpoint to update the maintenance status
    public ResponseEntity<Maintenance> updateMaintenance(@PathVariable Long maintenanceId, @RequestBody Maintenance updatedMaintenance) {
        // Updating the status
        Maintenance updatedRecord = maintenanceService.updateMaintenance(maintenanceId, updatedMaintenance);
        // Returning response
        return new ResponseEntity<>(updatedRecord, HttpStatus.OK);
    }
}