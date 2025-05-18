import { useEffect, useState } from "react";
import axios from "../api/axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch current user (from token)
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/users/1"); // Hardcoded for now; replace later with decoded token info
        setUserId(res.data.id);
        fetchTasks(res.data.id);
      } catch (err) {
        console.error("User fetch failed");
      }
    };

    const fetchTasks = async (id) => {
      try {
        const res = await axios.get(`/assignments/user/${id}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Task fetch failed");
      }
    };

    getUser();
  }, []);

  const handleComplete = async (assignmentId) => {
    try {
      await axios.post(`/assignments/complete/${assignmentId}`);
      setTasks(tasks.map(t =>
        t.id === assignmentId ? { ...t, completed: true } : t
      ));
    } catch (err) {
      alert("Failed to mark as complete");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">My Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map(task => (
            <li
              key={task.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {task.task.title} ({task.task.frequency})
                </h3>
                <p className="text-sm text-gray-600">{task.task.description}</p>
                <p className="text-sm text-gray-400">Due: {task.task.dueDate}</p>
              </div>

              <button
                disabled={task.completed}
                onClick={() => handleComplete(task.id)}
                className={`px-4 py-2 rounded text-white ${
                  task.completed ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {task.completed ? "Completed" : "Mark Done"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
