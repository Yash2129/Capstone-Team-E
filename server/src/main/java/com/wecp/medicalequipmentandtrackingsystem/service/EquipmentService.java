package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;
    @Autowired
    private HospitalRepository hospitalRepository;

    public Equipment addEquipment(Long hospitalId, Equipment equipment) {
        // check if hospital exists
        // add equipment to hospital
        Optional<Hospital> hospitals=hospitalRepository.findById(hospitalId);
        if(!hospitals.isPresent()){
        return equipmentRepository.save(equipment);
        }else{
            return null;
        }
    }

    public List<Equipment> getAllEquipmentOfHospital(Long hospitalId) {
        // return all equipments of hospital
        return null;
    }

    
}