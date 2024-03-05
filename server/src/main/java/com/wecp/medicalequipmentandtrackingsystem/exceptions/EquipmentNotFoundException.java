package com.wecp.medicalequipmentandtrackingsystem.exceptions;

// Exception for EquipmentNotFound
public class EquipmentNotFoundException extends RuntimeException {
    public EquipmentNotFoundException(String message) {
        super(message);
    }
}
