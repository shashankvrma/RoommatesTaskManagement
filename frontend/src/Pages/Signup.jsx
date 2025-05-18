import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROOMMATE",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    try {
      await axios.post("/auth/signup", form);
      alert("Signup successful. Please login.");
      navigate("/");
    } catch (err) {
      alert("Signup failed. Maybe email already exists.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Roommate Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded mb-4"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded mb-4"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded mb-4"
          value={form.password}
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full px-4 py-2 border rounded mb-6"
          value={form.role}
          onChange={handleChange}
        >
          <option value="ROOMMATE">Roommate</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
