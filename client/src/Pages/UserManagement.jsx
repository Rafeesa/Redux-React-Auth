import { useEffect, useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
    setUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(u._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
