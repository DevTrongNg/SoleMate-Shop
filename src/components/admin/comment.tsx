import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

interface IComment {
  id: number;
  productId: number;
  content: string;
  rating: number;
  date: string;
}

interface IProduct {
  id: number;
  name: string;
}

const CommentStats = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentRes, productRes] = await Promise.all([
          axios.get("http://localhost:3000/comment"),
          axios.get("http://localhost:3000/products"),
        ]);
        setComments(commentRes.data);
        setProducts(productRes.data);
      } catch (err) {
        toast.error("Lỗi khi tải dữ liệu");
      }
    };

    fetchData();
  }, []);

  // Đếm số lượng bình luận theo productId
  const countComments = (productId: number) => {
    return comments.filter((cmt) => cmt.productId === productId).length;
  };

  return (
    <div className="container mx-auto px-4 py-6">
    
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-bold mb-6">Sản phẩm & Số lượng bình luận</h2>

      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Tên sản phẩm</th>
            <th className="py-3 px-4 text-left">Số lượng bình luận</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4 font-medium text-green-700">
                {countComments(product.id)} bình luận
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentStats;
