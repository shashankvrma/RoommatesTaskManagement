package com.roomies.taskmanager.service;

import com.roomies.taskmanager.model.Apartment;
import com.roomies.taskmanager.model.Room;
import com.roomies.taskmanager.model.User;
import com.roomies.taskmanager.repository.ApartmentRepository;
import com.roomies.taskmanager.repository.RoomRepository;
import com.roomies.taskmanager.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ApartmentRepository apartmentRepository;

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

    @Transactional
    public String joinApartment(Long userId, Long apartmentId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Apartment apartment = apartmentRepository.findById(apartmentId)
                .orElseThrow(() -> new RuntimeException("Apartment not found"));

        user.setApartment(apartment); 
        userRepository.save(user);    

        return "User assigned to apartment successfully";
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
