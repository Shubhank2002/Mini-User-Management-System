import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
    setError("");
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const { fullName, email, password, confirmPassword } = form;
    const url = import.meta.env.VITE_API_URL;

    if (!fullName || !email || !password || !confirmPassword) {
      return setError("All fields are required");
    }
    if (!email.includes("@")) {
      return setError("Please enter a valid email");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${url}/auth/signup`,
        { fullName, email, password },
        { withCredentials: true }
      );

      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      setError(
        error?.response?.data?.message || "error occured while signing up"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen px-4 w-screen flex items-center justify-center bg-linear-to-br from-purple-100 to-purple-300">
      <div className="sm:w-1/3 flex flex-col bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6 space-y-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            Create Account
          </h1>
          <p className="text-gray-500">Sign up to get started</p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600 text-center mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4 text-gray-700">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium text-white transition
            ${loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            className="text-purple-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
