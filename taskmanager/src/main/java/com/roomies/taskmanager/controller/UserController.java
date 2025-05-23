package com.roomies.taskmanager.controller;

import com.roomies.taskmanager.model.User;
import com.roomies.taskmanager.repository.UserRepository;
import com.roomies.taskmanager.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/join-room")
    public String joinRoom(@RequestParam Long userId, @RequestParam Long roomId) {
        return userService.joinRoom(userId, roomId);
    }

    @PostMapping("/join-apartment")
    public String joinApartment(@RequestParam Long userId, @RequestParam Long apartmentId) {
        return userService.joinApartment(userId, apartmentId);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }


    @GetMapping("/all_users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
