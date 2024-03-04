package com.wecp.medicalequipmentandtrackingsystem.service;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.exceptions.HospitalServiceException;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Hospital createHospital(Hospital hospital) {
        try {
            return hospitalRepository.save(hospital);
        } catch (Exception e) {
            throw new HospitalServiceException("Failed to create hospital: " + e.getMessage());
        }
    }
}
