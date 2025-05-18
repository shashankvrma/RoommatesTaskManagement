package com.roomies.taskmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roomies.taskmanager.model.TaskAssignment;
import com.roomies.taskmanager.service.TaskAssignmentService;

@RestController
@RequestMapping("/api/assignments")
public class TaskAssignmentController {

    @Autowired
    private TaskAssignmentService service;

    @GetMapping("/user/{userId}")
    public List<TaskAssignment> getUserTasks(@PathVariable Long userId) {
        return service.getTasksForUser(userId);
    }

    @PostMapping("/complete/{assignmentId}")
    public String markCompleted(@PathVariable Long assignmentId) {
        return service.markCompleted(assignmentId);
    }
}
