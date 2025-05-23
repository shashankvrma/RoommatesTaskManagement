import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../utils/auth";

export default function MyNavbar() {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600/80 backdrop-blur-md shadow text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <span onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer">🏡 RoomMate</span>
        <div className="flex gap-4 items-center">
          {user && <span className="text-sm">Role: {user.role}</span>}
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
        </div>
      </div>
    </nav>
  );
}
