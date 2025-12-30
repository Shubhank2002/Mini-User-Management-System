import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../components/AdminDashboard";
import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";

const Dashboard = ({ user, setUser }) => {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const url = import.meta.env.VITE_API_URL;
      try {
        const { data } = await axios.get(`${url}/auth/me`, {
          withCredentials: true,
        });
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (!user) return null; // or redirect already happened
  return (
    <>
      <div className="flex  flex-col min-h-screen bg-gray-50">
        <Navbar user={user} setUser={setUser}/>
        {user?.role === "admin" ? <AdminDashboard /> : <UserProfile user={user} setUser={setUser}/>}</div>
    </>
  );
};

export default Dashboard;
