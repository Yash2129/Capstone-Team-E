package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;


public class EquipmentService {


    public Equipment addEquipment(Long hospitalId, Equipment equipment) {
        // check if hospital exists

        // add equipment to hospital
    }

    public List<Equipment> getAllEquipmentOfHospital(Long hospitalId) {
        // return all equipments of hospital
    }

    
}
