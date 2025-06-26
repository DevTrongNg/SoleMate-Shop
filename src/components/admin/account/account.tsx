import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IUser } from "../../../interface/user";

const Account = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/users");
        setUsers(data);
      } catch (error) {
        toast.error("Lỗi khi tải danh sách người dùng");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xoá người dùng này?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("✅ Xoá người dùng thành công!");
    } catch (error) {
      toast.error("❌ Lỗi khi xoá người dùng");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-bold mb-6">Quản lý tài khoản người dùng</h2>

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
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.phone}</td>
              <td className="py-2 px-4 capitalize">{user.role}</td>
              <td className="py-2 px-4 text-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleDelete(Number(user.id))}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Account;
