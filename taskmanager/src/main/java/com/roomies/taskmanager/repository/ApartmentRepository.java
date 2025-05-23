package com.roomies.taskmanager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.lang.NonNull;

import com.roomies.taskmanager.model.Apartment;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
    
    @NonNull
    Optional<Apartment> findById(Long id);
}

