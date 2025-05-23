import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "ROOMMATE" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    try {
      await axios.post("/auth/signup", form);
      alert("Signup successful!");
      navigate("/");
    } catch {
      alert("Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <input className="w-full p-2 border mb-3 rounded" name="name" placeholder="Name" onChange={handleChange} />
        <input className="w-full p-2 border mb-3 rounded" name="email" placeholder="Email" onChange={handleChange} />
        <input className="w-full p-2 border mb-3 rounded" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <select className="w-full p-2 border mb-6 rounded" name="role" value={form.role} onChange={handleChange}>
          <option value="ROOMMATE">Roommate</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}
