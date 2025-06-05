import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Access denied");
          setUsers([]);
          return;
        }

        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to fetch users. Try again later.");
        console.error("Fetch error:", err);
      }
    };

    if (currentUser?.token) {
      fetchUsers();
    } else {
      setError("Please log in as admin to view users.");
    }
  }, [currentUser?.token]);

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Delete failed");
        return;
      }

      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete user. Try again later.");
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.username} ${u.email} ${u.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {error && (
        <div className="mb-4 text-red-600 border p-2 rounded bg-red-100">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Search by name, email, phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-64 mb-4"
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Profile</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <tr key={u._id} className="border-t text-center">
                <td className="p-2">
                  <img
                    src={u.profilePicture}
                    alt="profile"
                    className="w-8 h-8 rounded-full mx-auto"
                  />
                </td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingUser(u);
                      setShowModal(true);
                    }}
                    className="text-slate-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            !error && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {showModal && editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>

            <input
              className="border p-2 mb-2 w-full"
              type="text"
              value={editingUser.username}
              onChange={(e) =>
                setEditingUser({ ...editingUser, username: e.target.value })
              }
              placeholder="Username"
            />
            <input
              className="border p-2 mb-2 w-full"
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              className="border p-2 mb-4 w-full"
              type="text"
              value={editingUser.phone}
              onChange={(e) =>
                setEditingUser({ ...editingUser, phone: e.target.value })
              }
              placeholder="Phone"
            />

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-slate-800 text-white rounded"
                onClick={async () => {
                  try {
                    const res = await fetch(
                      `/api/admin/users/${editingUser._id}`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${currentUser.token}`,
                        },
                        body: JSON.stringify(editingUser),
                      }
                    );

                    const updated = await res.json();

                    if (!res.ok) {
                      setError(updated.message || "Failed to update");
                      return;
                    }

                    setUsers((prev) =>
                      prev.map((u) => (u._id === updated._id ? updated : u))
                    );

                    setShowModal(false);
                    setEditingUser(null);
                  } catch (err) {
                    setError("Update failed. Try again.");
                  }
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
