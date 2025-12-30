import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL;

    const { email, password } = form;

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!email.includes("@")) {
      return setError("Please enter a valid email");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    try {
      setloading(true);
      const { data } = await axios.post(`${url}/auth/login`, form);

      if (data.success) navigate("/dashboard");
    } catch (error) {
        setError(error?.response?.data?.message || "Login failed. Try again.")
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-purple-100 to-purple-300">
      <div className="w-1/3 flex flex-col justify-center bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6 space-y-5">
          <h1 className="text-3xl font-semibold text-gray-800">
            Mini User Management System
          </h1>
          <p className="text-lg text-gray-500 mt-1">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-gray-700">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              name="email"
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none border-gray-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          
          <p className="text-sm text-red-600 text-center ">
             {error}
          </p>

          
          <button
            type="submit"
            disabled={loading}
            className={`w-full  ${
              loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
            } bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

       
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            className="text-purple-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
