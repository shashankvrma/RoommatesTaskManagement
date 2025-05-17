package com.roomies.taskmanager.controller;

import com.roomies.taskmanager.model.Task;
import com.roomies.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public Task createTask(@RequestBody Task task,
                           @RequestParam Long roomId) {
        return taskService.createTask(task, roomId);
    }
}
