package com.wecp.medicalequipmentandtrackingsystem.service;

import com.wecp.medicalequipmentandtrackingsystem.config.UserInfoUserDetails;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import com.wecp.medicalequipmentandtrackingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

/*
***************************************************************
    User service class for managing Equipment entities        
****************************************************************
*/

@Service // Service class for managing User entities
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository; // Repository for accessing User entities
    @Autowired
    private PasswordEncoder passwordEncoder; // Encoding the password

    // Method to add the user
    public User registerUser(User user) {
        // Encoding the user password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Save the user in the database
        return userRepository.save(user);
    }

    // Method to find the user using Username
    public User getUserByUsername(String username) {
        // Retriving the user
        return userRepository.findByUsername(username).get();
    }

    // Method to check if the username exists
    public boolean checkUsernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    // Loading the user
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Finding the userinfo
        Optional<User>userInfo = userRepository.findByUsername(username);
        return userInfo.map(UserInfoUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found " + username));
    }
}
