import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MyNavbar from "./components/MyNavbar";
import { getLoggedInUser } from "./utils/auth";

function AppRoutes() {
  const location = useLocation();
  const hideNav = ["/", "/signup"].includes(location.pathname);
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      {!hideNav && <MyNavbar />}
      <div className={!hideNav ? "pt-20" : ""}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/admin" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
