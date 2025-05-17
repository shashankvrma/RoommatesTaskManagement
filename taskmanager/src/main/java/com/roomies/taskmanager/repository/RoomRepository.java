package com.roomies.taskmanager.repository;

import com.roomies.taskmanager.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
