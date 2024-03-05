package com.wecp.medicalequipmentandtrackingsystem.repository;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
***********************************************************************************
    Hospital repository interface for accessing Equipment entities in database          
***********************************************************************************
*/

@Repository // Declaring HospitalRepository as an Repository interface
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    
}

