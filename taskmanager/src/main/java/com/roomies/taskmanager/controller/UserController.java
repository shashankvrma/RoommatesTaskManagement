package com.roomies.taskmanager.controller;

import com.roomies.taskmanager.model.User;
import com.roomies.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/join-room")
    public String joinRoom(@RequestParam Long userId, @RequestParam Long roomId) {
        return userService.joinRoom(userId, roomId);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
