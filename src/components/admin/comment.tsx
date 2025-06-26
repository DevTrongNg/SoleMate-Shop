import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface IComment {
  id: number;
  productId: number;
  userId: number;
  content: string;
  rating: number;
  date: string;
}

interface IUser {
  id: number;
  name: string;
}

interface IProduct {
  id: number;
  name: string;
}

const Comment = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  // Lấy dữ liệu từ db.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cmtRes, userRes, productRes] = await Promise.all([
          axios.get("http://localhost:3000/comment"),
          axios.get("http://localhost:3000/users"),
          axios.get("http://localhost:3000/products"),
        ]);

        setComments(cmtRes.data);
        setUsers(userRes.data);
        setProducts(productRes.data);
      } catch (err) {
        toast.error("Lỗi khi tải dữ liệu!");
      }
    };

    fetchData();
  }, []);

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user?.name || "Ẩn danh";
  };

  const getProductName = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product?.name || "Không rõ sản phẩm";
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xoá bình luận này không?")) {
      try {
        await axios.delete(`http://localhost:3000/comment/${id}`);
        setComments(comments.filter((c) => c.id !== id));
        toast.success("🗑️ Xoá bình luận thành công!");
      } catch (err) {
        toast.error("❌ Lỗi khi xoá bình luận.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-bold mb-6">Quản lý bình luận theo sản phẩm</h2>

      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Sản phẩm</th>
            <th className="py-3 px-4 text-left">Người bình luận</th>
            <th className="py-3 px-4 text-left">Đánh giá</th>
            <th className="py-3 px-4 text-left">Nội dung</th>
            <th className="py-3 px-4 text-left">Ngày</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((cmt) => (
            <tr key={cmt.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-2 px-4">{getProductName(cmt.productId)}</td>
              <td className="py-2 px-4">{getUserName(cmt.userId)}</td>
              <td className="py-2 px-4 text-yellow-500">{"★".repeat(cmt.rating)}</td>
              <td className="py-2 px-4">{cmt.content}</td>
              <td className="py-2 px-4 text-sm text-gray-500">{new Date(cmt.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleDelete(cmt.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
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

export default Comment;
