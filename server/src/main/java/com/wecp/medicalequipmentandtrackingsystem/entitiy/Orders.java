package com.wecp.medicalequipmentandtrackingsystem.entitiy;

import javax.persistence.*;
import java.util.Date;

/*
******************************
    Orders Entity Class      
******************************
*/

@Entity // Declaring Order as an Entity class
@Table(name = "orders") // Creating a table in database named "orders"
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique Identifier for the order

    private Date orderDate; // Date of the order 
    private String status; // status field to track the status of the order
    private int quantity; //Quantity of the order

    @ManyToOne // Many orders can be associated with one equipment
    @JoinColumn(name = "equipment_id")  //Column named equipment_id in the equipments table will be used as foreign key
    private Equipment equipment; // Creating an object of Equipment class

    // Getters and Setters for Id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    // Getters and Setters for Order Date 
    public Date getOrderDate() {
        return orderDate;
    }
    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    // Getters and Setters of the status
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    
    //Getters and Setters for the Quantity
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // Getters and Setters of the Equipment
    public Equipment getEquipment() {
        return equipment;
    }
    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

}
