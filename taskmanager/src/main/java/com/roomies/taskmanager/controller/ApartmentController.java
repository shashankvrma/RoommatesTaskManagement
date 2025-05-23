package com.roomies.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.roomies.taskmanager.model.Apartment;
import com.roomies.taskmanager.model.User;
import com.roomies.taskmanager.repository.ApartmentRepository;
import com.roomies.taskmanager.repository.UserRepository;

@RestController
@RequestMapping("/api/apartments")
public class ApartmentController {

    @Autowired
    private ApartmentRepository apartmentRepository;
    

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createApartment(@RequestBody Apartment apt, @RequestParam Long adminId) {
        java.util.Optional<User> adminOpt = userRepository.findById(adminId);

        if (adminOpt.isEmpty()) return ResponseEntity.notFound().build();

        User admin = adminOpt.get();

        // Check if admin already has an apartment
        if (admin.getApartment() != null) {
            return ResponseEntity.badRequest().body("Admin already has an apartment.");
        }
        Apartment savedApt = apartmentRepository.save(apt);
        admin.setApartment(savedApt);
        userRepository.save(admin);

        return ResponseEntity.ok(savedApt);
    }
}
