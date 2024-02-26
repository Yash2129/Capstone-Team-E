package com.wecp.medicalequipmentandtrackingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long>
{
    
}