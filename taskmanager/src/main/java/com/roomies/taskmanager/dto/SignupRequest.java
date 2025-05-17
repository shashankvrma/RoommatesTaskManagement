package com.roomies.taskmanager.dto;

import com.roomies.taskmanager.model.Role;
import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private Role role; // Either ADMIN or ROOMMATE
}
