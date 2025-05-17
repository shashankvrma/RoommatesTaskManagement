package com.roomies.taskmanager.service;

import com.roomies.taskmanager.model.*;
import com.roomies.taskmanager.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskAssignmentRepository taskAssignmentRepository;

    @Autowired
    private RoomRepository roomRepository;

    public Task createTask(Task task, Long roomId) {
        Task savedTask = taskRepository.save(task);
        assignTaskToNextUser(savedTask, roomId);
        return savedTask;
    }

    public void assignTaskToNextUser(Task task, Long roomId) {
        Optional<Room> roomOpt = roomRepository.findById(roomId);
        if (roomOpt.isEmpty()) return;

        Room room = roomOpt.get();
        List<User> users = room.getRoommates();
        if (users.isEmpty()) return;

        // Simple round-robin assignment using mod
        long assignmentCount = taskAssignmentRepository.count();
        User nextUser = users.get((int) (assignmentCount % users.size()));

        TaskAssignment assignment = TaskAssignment.builder()
                .task(task)
                .assignee(nextUser)
                .assignedDate(LocalDate.now())
                .completed(false)
                .build();

        taskAssignmentRepository.save(assignment);
    }
}
