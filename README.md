# 🏡 Roommate Task Manager

A full-stack Java + React application that helps roommates manage shared responsibilities like cleaning, groceries, and bill payments. Built with Spring Boot, React, Vite, and Tailwind CSS.

---

## ✨ Features

### 👥 Authentication & Roles
- Signup/Login with JWT authentication
- Role-based access: `ADMIN` and `ROOMMATE`

### 🏠 Room & Task Management
- Admins can create rooms and assign tasks to any roommate (including themselves)
- Roommates can join rooms and view their assigned tasks

### ✅ Task Assignment
- Tasks include frequency (Daily, Weekly, Monthly) and due dates
- Roommates can mark tasks as completed

---

## 🛠️ Tech Stack

| Frontend        | Backend             | Database |
|-----------------|---------------------|----------|
| React (Vite)    | Java Spring Boot    | H2 (in-memory) |
| Tailwind CSS    | Spring Security (JWT) |  |

---

## 🚀 Getting Started

### 🔧 Backend Setup (Spring Boot)
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/roommate-task-manager.git
   cd roommate-task-manager/backend
