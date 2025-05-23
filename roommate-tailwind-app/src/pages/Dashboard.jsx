import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getLoggedInUser } from "../utils/auth";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = getLoggedInUser();
    if (user?.id) {
      axios.get(`/assignments/user/${user.id}`)
        .then(res => setTasks(res.data))
        .catch(() => alert("Failed to load tasks"));
    }
  }, []);

  const handleComplete = async (id) => {
    try {
      await axios.post(`/assignments/complete/${id}`);
      setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: true } : task));
    } catch {
      alert("Failed to complete task");
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map(task => (
            <li key={task.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{task.task.title}</h3>
                <p className="text-gray-500">{task.task.description}</p>
                <p className="text-xs text-gray-400">Due: {task.task.dueDate}</p>
              </div>
              <button
                onClick={() => handleComplete(task.id)}
                disabled={task.completed}
                className={`px-4 py-2 rounded ${
                  task.completed ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"
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
}
