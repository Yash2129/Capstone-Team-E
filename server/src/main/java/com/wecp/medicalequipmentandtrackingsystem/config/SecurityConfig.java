package com.wecp.medicalequipmentandtrackingsystem.config;

import com.wecp.medicalequipmentandtrackingsystem.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService userDetailsService;
    private final JwtRequestFilter jwtRequestFilter;
    private final PasswordEncoder passwordEncoder;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // TODO: implement the security configuration

        // configure CORS and CSRF
        // configure the routes that are accessible without authentication
        // configure the routes that are accessible with specific roles
              // set the permission w.r.t to authorities
          // - /api/user/register: accessible to everyone
          // - /api/user/login: accessible to everyone
          // - /api/hospital/create: accessible to HOSPITAL authority
          // - /api/hospitals: accessible to HOSPITAL authority
          // - /api/hospital/equipment: accessible to HOSPITAL authority
          // - /api/hospital/equipment/{hospitalId}: accessible to HOSPITAL authority
          // - /api/hospital/maintenance/schedule: accessible to HOSPITAL authority
          // - /api/hospital/order: accessible to HOSPITAL authority
          // - /api/technician/maintenance: accessible to TECHNICIAN authority
          // - /api/technician/maintenance/update/{maintenanceId}: accessible to TECHNICIAN authority
          // - /api/supplier/orders: accessible to SUPPLIER authority
          // - /api/supplier/order/update/{orderId}: accessible to SUPPLIER authority
          // - any other route: accessible to authenticated users
        // configure the session management
        // add the jwtRequestFilter before the UsernamePasswordAuthenticationFilter

    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}