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

@RestController
public class HospitalController 
{
    @Autowired
    private HospitalService hospitalService;
    @Autowired
    private EquipmentService equipmentService;
    @Autowired
    private MaintenanceService maintenanceService;
    @Autowired
    private OrderService orderService;

    @PostMapping("/api/hospital/create")
    public ResponseEntity<Hospital> createHospital(@RequestBody Hospital hospital) {
        // create hospital and return the created hospital with status code 201 = CREATED;
        Hospital newHospital = hospitalService.createHospital(hospital);
        return new ResponseEntity<Hospital>(newHospital, HttpStatus.CREATED);
    }

    @GetMapping("/api/hospitals")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        // return all hospitals with response code = 200 ok
        List<Hospital> hospitalList = hospitalService.getAllHospitals();
        return new ResponseEntity<List<Hospital>>(hospitalList, HttpStatus.OK);
    }

    @PostMapping("/api/hospital/equipment")
    public ResponseEntity<Equipment> addEquipment(@RequestParam Long hospitalId, @RequestBody Equipment equipment) {
        // add equipment to the hospital and return the added equipment with status code 201 = CREATED;
        Equipment newEquipment = equipmentService.addEquipment(hospitalId, equipment);
        return new ResponseEntity<Equipment>(newEquipment, HttpStatus.CREATED);
    }

    @GetMapping("/api/hospital/equipment/{hospitalId}")
    public ResponseEntity<List<Equipment>> getAllEquipmentsOfHospital(@PathVariable Long hospitalId) {
        // return all equipments of hospital with response code = 200 OK
        List<Equipment> equipmentsList = equipmentService.getAllEquipmentOfHospital(hospitalId);
        return new ResponseEntity<List<Equipment>>(equipmentsList, HttpStatus.OK);
    }

    @PostMapping("/api/hospital/maintenance/schedule")
    public ResponseEntity<Maintenance> scheduleMaintenance
            (@RequestParam Long equipmentId, @RequestBody Maintenance maintenance) {
        // schedule maintenance for the equipment and return the scheduled maintenance with status code 201 = CREATED;
        Maintenance maintenanceShedule = maintenanceService.scheduleMaintenance(equipmentId, maintenance);
        return new ResponseEntity<Maintenance>(maintenanceShedule, HttpStatus.CREATED);
    }

    @PostMapping("/api/hospital/order")
    public ResponseEntity<Orders> placeOrder(@RequestParam Long equipmentId, @RequestBody Orders order) {
        // place order for the equipment and return the placed order with status code 201 = CREATED;
        Orders placedOrder = orderService.placeOrder(equipmentId, order);
        return new ResponseEntity<Orders>(placedOrder, HttpStatus.CREATED);
    }
}