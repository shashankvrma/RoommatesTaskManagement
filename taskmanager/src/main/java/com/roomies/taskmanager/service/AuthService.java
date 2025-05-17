package com.roomies.taskmanager.service;

import com.roomies.taskmanager.dto.LoginRequest;
import com.roomies.taskmanager.dto.SignupRequest;
import com.roomies.taskmanager.model.User;
import com.roomies.taskmanager.repository.UserRepository;
import com.roomies.taskmanager.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already in use.";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);
        return "Signup successful.";
    }



    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // ✅ Generate token here
        String token = jwtUtil.generateToken(user.getEmail());
        return token; // return the token
    }

}
