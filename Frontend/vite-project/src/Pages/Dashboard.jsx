import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../components/AdminDashboard";

const Dashboard = () => {
  const [user, setuser] = useState(null);
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
          setuser(data.user);
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
  return <>{user?.role === "admin" ? <AdminDashboard /> : <User />}</>;
};

export default Dashboard;
