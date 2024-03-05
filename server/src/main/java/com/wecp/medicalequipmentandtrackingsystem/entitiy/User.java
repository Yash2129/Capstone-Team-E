package com.wecp.medicalequipmentandtrackingsystem.entitiy;

import javax.persistence.*;

/*
******************************
    User Entity Class      
******************************
*/

@Entity // Declaring User as an Entity class
@Table(name = "users") // Creating a table in database named "users"
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique Identifier for the user

    private String username; // Username of the user
    private String password; // Password of the user
    private String email; // Email of the user
    private String role; // Role of the user

    // Getters and Setters of the id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    // Getters and Setters of the username
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    // Getters and Setters for the password
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    // Getters and Setters for the Email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // Getters and Setters for the role
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
