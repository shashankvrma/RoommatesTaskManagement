package com.roomies.taskmanager.service;

import com.roomies.taskmanager.model.Room;
import com.roomies.taskmanager.model.User;
import com.roomies.taskmanager.repository.RoomRepository;
import com.roomies.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    public Room createRoom(String roomName, Long adminId) {
        Optional<User> adminOpt = userRepository.findById(adminId);
        if (adminOpt.isEmpty()) {
            throw new RuntimeException("Admin user not found");
        }

        User admin = adminOpt.get();
        Room room = Room.builder()
                .name(roomName)
                .build();
        Room savedRoom = roomRepository.save(room);

        // Link admin to the room
        admin.setRoom(savedRoom);
        userRepository.save(admin);

        return savedRoom;
    }
}
