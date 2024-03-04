package com.wecp.medicalequipmentandtrackingsystem.config;

import com.wecp.medicalequipmentandtrackingsystem.jwt.JwtRequestFilter;
import com.wecp.medicalequipmentandtrackingsystem.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter authFilter;

    // Define the custom UserDetailsService bean
    @Bean
    public UserDetailsService userDetailsService() {
        return new UserService();
    }

    // Define the SecurityFilterChain bean to configure security settings
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Configure CORS and CSRF settings
                .cors().and().csrf().disable()
                // Configure authorization rules
                .authorizeRequests()
                // Permit access to login and registration endpoints
                .antMatchers("/api/user/login").permitAll()
                .antMatchers("/api/user/register").permitAll()
                // Configure authorization based on HTTP methods and authorities
                .antMatchers(HttpMethod.POST, "/api/hospital/create").hasAuthority("HOSPITAL")
                .antMatchers(HttpMethod.POST, "/api/hospital/equipment").hasAuthority("HOSPITAL")
                .antMatchers(HttpMethod.POST, "/api/hospital/maintenance/schedule").hasAuthority("HOSPITAL")
                .antMatchers(HttpMethod.POST, "/api/hospital/order").hasAuthority("HOSPITAL")
                .antMatchers(HttpMethod.GET, "/api/hospital/equipment").hasAuthority("HOSPITAL")
                .antMatchers(HttpMethod.GET, "/api/hospital/equipment/**").hasAuthority("HOSPITAL")
                .antMatchers(HttpMethod.GET, "/api/hospitals").hasAuthority("HOSPITAL")
                .antMatchers(HttpMethod.GET, "/api/technician/maintenance").hasAuthority("TECHNICIAN")
                .antMatchers(HttpMethod.PUT, "/api/technician/maintenance/update/**").hasAuthority("TECHNICIAN")
                .antMatchers(HttpMethod.GET, "/api/supplier/orders").hasAuthority("SUPPLIER")
                .antMatchers(HttpMethod.PUT, "/api/supplier/order/update/**").hasAuthority("SUPPLIER")
                // Require authentication for all other endpoints under "/api"
                .antMatchers("/api/**").authenticated()
                .and()
                // Configure session management to be STATELESS
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // Configure authentication provider and JWT filter
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // Define the password encoder bean
    @Bean
    public PasswordEncoder passwordEncoders() {
        return new BCryptPasswordEncoder();
    }

    // Define the authentication provider bean
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoders());
        return authenticationProvider;
    }

    // Define the authentication manager bean
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
