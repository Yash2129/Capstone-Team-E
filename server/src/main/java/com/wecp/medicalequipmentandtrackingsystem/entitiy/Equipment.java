package com.wecp.medicalequipmentandtrackingsystem.entitiy;

import javax.persistence.*;

/*
******************************
    Equipment Entity Class      
******************************
*/

@Entity // Declaring Equipment as an Entity class
@Table(name = "equipments") // Creating a table in database named "equipments"
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id; // Unique Identifier for the equipment

    private String name; // Name of the equipment
    private String description; // Description of the equipment

    @ManyToOne // Many equipment can belong to one hospital
    @JoinColumn(name = "hospitalId") //Column named hospitalId in the equipments table will be used as foreign key
    private Hospital hospital; // Creating an object of Hospital class

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

    //Getters and Setters for Description
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    //Getters and Setters for Hospital
    public Hospital getHospital() {
        return hospital;
    }
    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }

}
