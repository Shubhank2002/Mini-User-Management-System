import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      navigate("/login");
    } catch {
      alert("Logout failed");
    }
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold text-purple-600">
          Mini UMS
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
            to="/admin"
            className="text-sm text-gray-700 hover:text-purple-600"
          >
            Admin Panel
          </Link>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">
            {user?.fullName}
          </p>
          <p className="text-xs text-gray-500 capitalize">
            {user?.role}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
