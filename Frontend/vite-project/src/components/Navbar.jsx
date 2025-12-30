import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const url = import.meta.env.VITE_API_URL;
    try {
      await axios.post(`${url}/auth/logout`, {}, { withCredentials: true });

      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Logout failed");
    }
  };

  return (
    <nav className="w-screen text-black space-x-2 bg-white border-b shadow-sm px-2 sm:px-12 py-3 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center gap-3 sm:gap-6">
        <h1 className="sm:text-3xl text-sm font-semibold text-purple-600">
          Mini User Management System
        </h1>

        {/* Role-based navigation */}
        <Link
          to="/dashboard"
          className="text-sm text-gray-700 hover:text-purple-600"
        >
          Dashboard
        </Link>

        {user?.role === "admin" && (
          <Link
            to="/admin/profile"
            className="text-sm text-gray-700 hover:text-purple-600"
          >
            Profile
          </Link>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="text-right">
          <p className="sm:text-lg text-sm font-medium text-gray-800">{user?.fullName}</p>
          <p className="sm:text-sm text-xs text-left text-gray-500 capitalize">
            {user?.role}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white sm:px-3 py-1.5 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
