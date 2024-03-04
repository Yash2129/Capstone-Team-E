package com.wecp.medicalequipmentandtrackingsystem.exceptions;

public class EquipmentNotFoundException extends RuntimeException {
    public EquipmentNotFoundException(String message) {
        super(message);
    }
}
