package com.roomies.taskmanager.service;

import com.roomies.taskmanager.model.TaskAssignment;
import com.roomies.taskmanager.repository.TaskAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskAssignmentService {

    @Autowired
    private TaskAssignmentRepository taskAssignmentRepository;

    public List<TaskAssignment> getTasksForUser(Long userId) {
        return taskAssignmentRepository.findByAssigneeId(userId);
    }

    public String markCompleted(Long assignmentId) {
        var assignmentOpt = taskAssignmentRepository.findById(assignmentId);
        if (assignmentOpt.isEmpty()) return "Assignment not found";

        var assignment = assignmentOpt.get();
        assignment.setCompleted(true);
        taskAssignmentRepository.save(assignment);
        return "Marked as completed";
    }
}
