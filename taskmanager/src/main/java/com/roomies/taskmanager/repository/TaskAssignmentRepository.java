package com.roomies.taskmanager.repository;

import com.roomies.taskmanager.model.TaskAssignment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskAssignmentRepository extends JpaRepository<TaskAssignment, Long> {

    List<TaskAssignment> findByAssigneeId(Long userId);

}
