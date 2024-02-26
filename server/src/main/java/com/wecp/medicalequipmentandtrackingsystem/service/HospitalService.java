package com.wecp.medicalequipmentandtrackingsystem.service;

import java.util.List;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HospitalService 
{
    @Autowired
    private HospitalRepository hospitalRepository;

    // create hospital
    public Hospital createHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    // return list of hospitals
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }   
}