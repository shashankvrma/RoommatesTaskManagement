import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getLoggedInUser } from "./utils/auth";

const AdminDashboard = () => {
  const [roomName, setRoomName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    frequency: "DAILY",
    dueDate: "",
    assigneeId: ""
  });

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const user = getLoggedInUser();
    if (user) {
        setAdminId(user.id);
        fetchTasks(user.id);
    } else {
        alert("Not logged in");
    }
   }, []);

  const handleRoomCreate = async () => {
    try {
      await axios.post(`/rooms/create?name=${roomName}&adminId=${adminId}`);
      alert("Room created!");
    } catch {
      alert("Failed to create room.");
    }
  };

  const handleTaskCreate = async () => {
    try {
      await axios.post(`/tasks/create?assigneeId=${task.assigneeId}`, task);
      alert("Task created and assigned!");
    } catch {
      alert("Failed to assign task.");
    }
  };

  // Fetch users to assign tasks to
  useEffect(() => {
    axios.get("/users/") // Optional: fetch all users
      .then((res) => setUsers(res.data))
      .catch(() => console.log("Failed to fetch users"));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50 space-y-10">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      {/* Room Creation */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Create Room</h2>
        <input
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button onClick={handleRoomCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Room
        </button>
      </div>

      {/* Task Creation */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Create Task</h2>

        <input
          placeholder="Task Title"
          name="title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Description"
          name="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <select
          value={task.frequency}
          onChange={(e) => setTask({ ...task, frequency: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
        </select>

        <select
          value={task.assigneeId}
          onChange={(e) => setTask({ ...task, assigneeId: e.target.value })}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Assign to...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <button onClick={handleTaskCreate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Create Task
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
