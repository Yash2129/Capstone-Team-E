package com.wecp.medicalequipmentandtrackingsystem.exceptions;

// Exception for MaintenanceNotFound
public class MaintenanceNotFoundException extends RuntimeException {
    public MaintenanceNotFoundException(String message) {
        super(message);
    }
}
