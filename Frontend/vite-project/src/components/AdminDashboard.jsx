import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(""); // activate | deactivate
  const [toast, setToast] = useState(null);

  const fetchUsers = async () => {
    const url = import.meta.env.VITE_API_URL;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/admin/users?page=${page}&limit=10`,
        { withCredentials: true }
      );

      const sortedUsers = [...data.users].sort((a, b) => {
        if (a.role === "admin") return -1;
        if (b.role === "admin") return 1;
        return 0;
      });
      setUsers(sortedUsers);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page,actionType]);

  const confirmAction = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
  };

  const handleAction = async () => {
    const url = import.meta.env.VITE_API_URL;
    try {
      await axios.patch(
        `${url}/admin/users/${selectedUser._id}/deactivate`,
        { actionType },
        { withCredentials: true }
      );

      setToast({
        type: "success",
        message: `User ${actionType} successfully`,
      });

      fetchUsers();
    } catch {
      setToast({
        type: "error",
        message: "Action failed",
      });
    } finally {
      setSelectedUser(null);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="sm:text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500">Manage users and permissions</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full ">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left hidden sm:table-cell">
                  Full Name
                </th>
                <th className="px-6 py-3 hidden sm:table-cell">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t text-black text-md hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell text-center">
                    <span className="px-2 py-1 rounded text-md bg-purple-100 text-purple-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-md">
                    {user.status==='active' ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-red-600">Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {user.status==='active' ? (
                      <button
                        onClick={() => confirmAction(user, "inactive")}
                        className="text-white hover:underline bg-red-600"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => confirmAction(user, "active")}
                        className="text-white bg-green-400 hover:underline"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 border-t">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="text-sm text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="text-sm text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96">
            <h2 className="text-lg font-semibold mb-2">Confirm Action</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to {actionType}{" "}
              <strong>{selectedUser.email}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 text-sm border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                className={`px-4 py-2 text-sm text-white rounded
                ${actionType === "activate" ? "bg-green-600" : "bg-red-600"}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-2 rounded text-white
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
