package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import com.wecp.medicalequipmentandtrackingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
// public class UserService implements UserDetailsService {
public class UserService{
    // private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;


    public User registerUser(User user) {
        // Encode the password
        // then save the user
        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        // get the user by username
        return null;
    }

    // @Override
    // public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    //     // load the user by username and return UserDetails
    //     return null;
    // }
}