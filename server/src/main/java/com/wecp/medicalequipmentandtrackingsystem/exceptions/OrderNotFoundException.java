package com.wecp.medicalequipmentandtrackingsystem.exceptions;

// Exception for OrderNotFound
public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(String message) {
        super(message);
    }
}
