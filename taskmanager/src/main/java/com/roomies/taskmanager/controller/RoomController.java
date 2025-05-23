package com.roomies.taskmanager.controller;

import com.roomies.taskmanager.model.Room;
import com.roomies.taskmanager.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/create")
    public Room createRoom(@RequestParam String name, @RequestParam Long adminId) {
        return roomService.createRoom(name, adminId);
    }
}
