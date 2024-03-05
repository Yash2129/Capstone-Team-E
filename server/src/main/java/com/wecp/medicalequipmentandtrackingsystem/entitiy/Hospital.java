package com.wecp.medicalequipmentandtrackingsystem.entitiy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.List;

/*
******************************
    Hospital Entity Class      
******************************
*/

@Entity // Declaring Hospital as an Entity class
@Table(name = "hospital") // Creating a table in database named "hospital"
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique Identifier for the hospital

    private String name; // Name of the hospital
    private String location; //Location of the hospital

    @OneToMany(mappedBy = "hospital") // One equipment can be present in many hospital
    @JsonIgnore
    private List<Equipment> equipmentList;  // Creating an list of objects of Equipment class

    //Getters and Setters for Id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    //Getters and Setters for Name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    //Getters and Setters for Location
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    //Getters and Setters for Equipment list
    public List<Equipment> getEquipmentList() {
        return equipmentList;
    }
    public void setEquipmentList(List<Equipment> equipmentList) {
        this.equipmentList = equipmentList;
    }
}
