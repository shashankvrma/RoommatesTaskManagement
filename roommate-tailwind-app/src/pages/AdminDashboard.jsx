import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getLoggedInUser } from "../utils/auth";

export default function AdminDashboard() {
  const [roomName, setRoomName] = useState("");
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    frequency: "DAILY",
    dueDate: "",
    assigneeId: "",
  });
  const [aptName, setAptName] = useState("");
  const admin = getLoggedInUser();
  const [inviteEmail, setInviteEmail] = useState("");
  const [apartment, setApartment] = useState(null);
  const inviteLink = `http://localhost:5173/signup?apartmentId=${apartment?.id}`;

  useEffect(() => {
    axios
      .get(`/users/${admin.id}`)
      .then((res) => {
        setApartment(res.data.apartment);
      })
      .catch((err) => {
        console.error("Failed to fetchapartment");
      });
    axios
      .get("/users/all_users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch users");
      });
  }, []);

  const handleRoomCreate = async () => {
    try {
      await axios.post(`/rooms/create?name=${roomName}&adminId=${admin.id}`);
      alert("Room created!");
    } catch {
      alert("Failed to create room");
    }
  };

  const handleTaskCreate = async () => {
    try {
      await axios.post(`/tasks/create?assigneeId=${task.assigneeId}`, task);
      alert("Task created!");
    } catch {
      alert("Failed to create task");
    }
  };

  const handleSendInvite = async () => {
    try {
      await axios.post("/invites/apartment", {
        email: inviteEmail,
        apartmentId: apartment.id,
      });
      alert("Invite sent!");
    } catch {
      alert("Failed to send invite.");
    }
  };

  const handleCreateApartment = async () => {
    try {
      const res = await axios.post(`/apartments/create?adminId=${admin.id}`, {
        apartment_name: aptName,
      });
      setApartment(res.data);
      alert("Apartment created!");
    } catch (err) {
      alert("Failed to create apartment.");
    }
  };

  const assignUserToApartment = async (userId) => {
    try {
      await axios.post(
        `/users/join-apartment?userId=${admin.id}&apartmentId=${apartment.id}`
      );
      alert("Apartment assigned!");
    } catch (err) {
      alert("Failed to assign apartment to the user.");
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {!apartment ? (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-2">Create Apartment</h2>
          <input
            value={aptName}
            onChange={(e) => setAptName(e.target.value)}
            placeholder="Apartment Name"
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handleCreateApartment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Apartment
          </button>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-2">
            Apartment: {apartment.apartment_name}
          </h2>

          <p className="text-sm mb-4 text-gray-600">
            Invite roommates via link or email.
          </p>

          <input
            placeholder="Enter email to invite"
            className="w-full p-2 border mb-2"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <button
            onClick={handleSendInvite}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-2"
          >
            Send Gmail Invite
          </button>

          <p className="text-sm text-gray-600 mt-2">
            Or share this link:
            <br />
            <span className="text-blue-600 underline break-all">
              {inviteLink}
            </span>
          </p>
        </div>
      )}

      <hr />
      {apartment && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-2">All Users</h2>

          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="py-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  {user.apartment === null ? (
                    <button
                      onClick={() => assignUserToApartment(user.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      Add to Apartment
                    </button>
                  ) : (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Already Assigned
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Create Task</h2>
        <input
          placeholder="Title"
          className="w-full p-2 border mb-2"
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border mb-2"
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea>
        <input
          type="date"
          className="w-full p-2 border mb-2"
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
        <select
          className="w-full p-2 border mb-2"
          onChange={(e) => setTask({ ...task, frequency: e.target.value })}
        >
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
        </select>
        <select
          className="w-full p-2 border mb-4"
          onChange={(e) => setTask({ ...task, assigneeId: e.target.value })}
        >
          <option value="">Select user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleTaskCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
