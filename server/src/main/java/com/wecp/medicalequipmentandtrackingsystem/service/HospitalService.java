package com.wecp.medicalequipmentandtrackingsystem.service;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.exceptions.HospitalServiceException;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/*
***************************************************************
    Hospital service class for managing Equipment entities        
****************************************************************
*/

@Service // Service class for managing Hospital entities
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository; // Repository for accessing Hospital entities

    // Method to get the list of hospitals
    public List<Hospital> getAllHospitals() {
        // Retriving the hospitals
        return hospitalRepository.findAll();
    }

    // Method to add the hospital
    public Hospital createHospital(Hospital hospital) {
        try {
            // Save the hospital to the database
            return hospitalRepository.save(hospital);
        } catch (Exception e) {
            //Throwing exception
            throw new HospitalServiceException("Failed to create hospital: " + e.getMessage());
        }
    }
}
