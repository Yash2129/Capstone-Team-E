package com.wecp.medicalequipmentandtrackingsystem.controller;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Orders;
import com.wecp.medicalequipmentandtrackingsystem.service.EquipmentService;
import com.wecp.medicalequipmentandtrackingsystem.service.HospitalService;
import com.wecp.medicalequipmentandtrackingsystem.service.MaintenanceService;
import com.wecp.medicalequipmentandtrackingsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/*
*************************************************************************
    Hospital controller class for managing hospital related endpoints        
*************************************************************************
*/

@RestController
public class HospitalController {

    @Autowired
    private EquipmentService equipmentService; // Instance variable that holds a reference to an EquipmentService object
    @Autowired
    private MaintenanceService maintenanceService; // Instance variable that holds a reference to an MaintenanceService object
    @Autowired
    private OrderService orderService;  // Instance variable that holds a reference to an OrderService object
    @Autowired
    private HospitalService hospitalService;  // Instance variable that holds a reference to an HospitalService object

    @PostMapping("/api/hospital/create")
    public ResponseEntity<Hospital> createHospital(@RequestBody Hospital hospital) {
        Hospital createdHospital = hospitalService.createHospital(hospital);
        return new ResponseEntity<>(createdHospital, HttpStatus.CREATED);
    }

    @GetMapping("/api/hospitals")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        return new ResponseEntity<>(hospitals, HttpStatus.OK);
    }

    @PostMapping("/api/hospital/equipment") // Endpoint to add a new equipment to hospital
    public ResponseEntity<Equipment> addEquipment(@RequestParam Long hospitalId, @RequestBody Equipment equipment) {
        //Adding equipment to specific hospital by using specified hospitalId
        Equipment addedEquipment = equipmentService.addEquipment(hospitalId, equipment);  
        //Returning response with added equipment 
        return new ResponseEntity<>(addedEquipment, HttpStatus.CREATED);
    }

    @GetMapping("/api/hospital/equipment/{hospitalId}") // Endpoint to get an equipment belonging to specified hospital
    public ResponseEntity<List<Equipment>> getAllEquipmentsOfHospital(@PathVariable Long hospitalId) {
        //Get all the equipments by using the hospitalId
        List<Equipment> equipments = equipmentService.getAllEquipmentOfHospital(hospitalId);
        //Returning response with equipment list
        return new ResponseEntity<>(equipments, HttpStatus.OK);
    }

    @PostMapping("/api/hospital/maintenance/schedule")
    public ResponseEntity<Maintenance> scheduleMaintenance(@RequestParam Long equipmentId,
            @RequestBody Maintenance maintenance) {
        Maintenance scheduledMaintenance = maintenanceService.scheduleMaintenance(equipmentId, maintenance);
        return new ResponseEntity<>(scheduledMaintenance, HttpStatus.CREATED);
    }

    @PostMapping("/api/hospital/order")
    public ResponseEntity<Orders> placeOrder(@RequestParam Long equipmentId, @RequestBody Orders order) {
        Orders placedOrder = orderService.placeOrder(equipmentId, order);
        return new ResponseEntity<>(placedOrder, HttpStatus.CREATED);
    }
}