package com.roomies.taskmanager.service;

import com.roomies.taskmanager.model.Room;
import com.roomies.taskmanager.model.User;
import com.roomies.taskmanager.repository.RoomRepository;
import com.roomies.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    public String joinRoom(Long userId, Long roomId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Room> roomOpt = roomRepository.findById(roomId);

        if (userOpt.isEmpty() || roomOpt.isEmpty()) {
            return "User or Room not found";
        }

        User user = userOpt.get();
        user.setRoom(roomOpt.get());
        userRepository.save(user);

        return "Joined room successfully";
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
