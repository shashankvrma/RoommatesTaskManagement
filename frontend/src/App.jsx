import './App.css'
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import AdminDashboard from './Pages/AdminDashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
