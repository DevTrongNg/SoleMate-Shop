import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "client";
}

const Account = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedRole, setSelectedRole] = useState<"all" | "admin" | "client">("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      setUsers(data);
    } catch (error) {
      toast.error("Không thể tải danh sách người dùng.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      toast.success("🗑️ Xóa người dùng thành công!");
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      toast.error("❌ Lỗi khi xóa người dùng.");
    }
  };

  const filteredUsers =
    selectedRole === "all"
      ? users
      : users.filter((user) => user.role === selectedRole);

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-bold mb-6">Quản lý tài khoản người dùng</h2>

      {/* Bộ lọc vai trò */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Lọc theo vai trò: </label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as any)}
          className="border border-gray-300 px-3 py-1 rounded"
        >
          <option value="all">Tất cả</option>
          <option value="admin">Admin</option>
          <option value="client">Client</option>
        </select>
      </div>

      {/* Bảng danh sách người dùng */}
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Họ tên</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">SĐT</th>
            <th className="py-3 px-4 text-left">Vai trò</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.phone}</td>
              <td className="py-2 px-4 capitalize">{user.role}</td>
              <td className="py-2 px-4 text-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                Không có người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Account;
