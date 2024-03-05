package com.wecp.medicalequipmentandtrackingsystem.controller;

import com.wecp.medicalequipmentandtrackingsystem.dto.LoginRequest;
import com.wecp.medicalequipmentandtrackingsystem.dto.LoginResponse;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import com.wecp.medicalequipmentandtrackingsystem.jwt.JwtUtil;
import com.wecp.medicalequipmentandtrackingsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/*
*************************************************************************
    Register and Login controller class for managing Registration and Login Purpose       
*************************************************************************
*/

@RestController
public class RegisterAndLoginController {

    // Autowired UserService for managing user-related operations
    @Autowired
    private UserService userService;

    // Autowired JwtUtil for handling JWT token generation and validation
    @Autowired
    private JwtUtil jwtUtil;

    // Autowired AuthenticationManager for authenticating user credentials
    @Autowired
    private AuthenticationManager authenticationManager;

    // Check if the provided username already exists
    @GetMapping("/checkUsername")
    public ResponseEntity<Boolean> checkUsernameExists(@RequestParam String username) {
        boolean usernameExists = userService.checkUsernameExists(username);
        return ResponseEntity.ok(usernameExists);
    }

    // Register a new user
    @PostMapping("/api/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    // Endpoint for user login
    @PostMapping("/api/user/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user credentials using Spring Security AuthenticationManager
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            // Handle authentication failure
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password", e);
        }

        // Load user details and generate JWT token
        final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
        final String token = jwtUtil.generateToken(userDetails.getUsername());

        // Retrieve user details
        User user = userService.getUserByUsername(loginRequest.getUsername());

        // Return login response with JWT token and user details
        return ResponseEntity.ok(new LoginResponse(token, user.getUsername(), user.getEmail(), user.getRole()));
    }
}
