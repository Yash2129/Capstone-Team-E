package com.wecp.medicalequipmentandtrackingsystem.repository;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/*
***********************************************************************************
    User repository interface for accessing Equipment entities in database          
***********************************************************************************
*/

@Repository // Declaring UserRepository as an Repository interface
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom method to find by username
    Optional<User> findByUsername(String username);
    // Checking if username exists
    boolean existsByUsername(String username);

}

