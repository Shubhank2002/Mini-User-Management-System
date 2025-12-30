import { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = ({ user, setUser }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Populate form on load
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName,
        email: user.email,
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setError("");
    setMessage("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setError("");
    setMessage("");
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "/api/users/profile",
        form,
        { withCredentials: true }
      );

      setUser(data.user);
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    try {
      setLoading(true);
      await axios.put(
        "/api/users/change-password",
        passwordForm,
        { withCredentials: true }
      );

      setPasswordForm({ currentPassword: "", newPassword: "" });
      setMessage("Password changed successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  const cancelChanges = () => {
    setForm({
      fullName: user.fullName,
      email: user.email,
    });
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
    });
    setError("");
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">User Profile</h1>

      {/* Messages */}
      {message && (
        <p className="mb-4 text-green-600">{message}</p>
      )}
      {error && (
        <p className="mb-4 text-red-600">{error}</p>
      )}

      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">
          Profile Information
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleProfileChange}
            placeholder="Full Name"
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleProfileChange}
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={saveProfile}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Save
          </button>
          <button
            onClick={cancelChanges}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-medium mb-4">
          Change Password
        </h2>

        <div className="space-y-4">
          <input
            type="password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Current Password"
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            placeholder="New Password"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={changePassword}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Update Password
          </button>
          <button
            onClick={cancelChanges}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
