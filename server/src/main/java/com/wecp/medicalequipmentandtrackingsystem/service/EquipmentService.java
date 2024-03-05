package com.wecp.medicalequipmentandtrackingsystem.service;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wecp.medicalequipmentandtrackingsystem.exceptions.HospitalServiceException;
import java.util.List;

/*
***************************************************************
    Equipment service class for managing Equipment entities        
****************************************************************
*/

@Service // Service class for managing Equipment entities
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository; // Repository for accessing Equipment entities
    @Autowired
    private HospitalRepository hospitalRepository; // Repository for accessing Hospital entities

    // Method to add the equipment
    public Equipment addEquipment(Long hospitalId, Equipment equipment) { // Method to add new equipment to a hospital
        // Check if the hospital with the given ID exists
        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new HospitalServiceException("Hospital with ID: " + hospitalId + " doesn't exist"));
        equipment.setHospital(hospital); // Set the hospital for the equipment
        return equipmentRepository.save(equipment); // Save the equipment to the database
    }

    // Method to get the list of equipments
    public List<Equipment> getAllEquipmentOfHospital(Long hospitalId) {
        return equipmentRepository.findByHospitalId(hospitalId); // Retrieve equipments by hospitalId
    }

}