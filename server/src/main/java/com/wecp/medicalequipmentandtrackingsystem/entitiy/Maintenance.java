package com.wecp.medicalequipmentandtrackingsystem.entitiy;

import javax.persistence.*;
import java.util.Date;

/*
******************************
    Maintenance Entity Class      
******************************
*/

@Entity // Declaring Maintenance as an Entity class
@Table(name = "maintenances") // Creating a table in database named "maintenances"
public class Maintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique Identifier for the maintenance

    private Date scheduledDate; // Scheduled maintenance date
    private Date completedDate; // Completed maintenance date
    private String description; // Description of the maintenance
    private String status; // status field to track the status of the maintenance task


    @ManyToOne // Many maintenance tasks can be associated with one equipment
    @JoinColumn(name = "equipmentId") //Column named equipmentId in the equipments table will be used as foreign key
    private Equipment equipment; // Creating an object of Equipment class

    //Getters and Setter for Id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    //Getters and Setter for Scheduled Date
    public Date getScheduledDate() {
        return scheduledDate;
    }
    public void setScheduledDate(Date scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    //Getters and Setter for Completed Date
    public Date getCompletedDate() {
        return completedDate;
    }
    public void setCompletedDate(Date completedDate) {
        this.completedDate = completedDate;
    }

    //Getters and Setter for Description
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    // Getters and Setter for Status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    //Getters and Setters for Equipment
    public Equipment getEquipment() {
        return equipment;
    }
    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

}
