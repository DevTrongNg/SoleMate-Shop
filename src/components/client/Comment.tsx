import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { IUser } from "../../interface/user";
import "react-toastify/dist/ReactToastify.css";

interface IComment {
  id: number;
  productId: number;
  userId: number;
  content: string;
  rating: number; // số sao từ 1 đến 5
  date: string;
}

const ReviewSection = () => {
  const { id } = useParams();
  const productId = Number(id);

  const [comments, setComments] = useState<IComment[]>([]);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const [users, setUsers] = useState<IUser[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchComments = async () => {
    const { data } = await axios.get("http://localhost:3000/comment");
    const filtered = data.filter(
      (cmt: IComment) => cmt.productId === productId
    );
    setComments(filtered.reverse());
  };

  const handleSubmit = async () => {
    if (!user) return toast.error("Bạn phải đăng nhập để bình luận!");

    const newComment = {
      userId: user.id,
      productId,
      content,
      rating,
      date: new Date().toISOString(),
    };

    await axios.post("http://localhost:3000/comment", newComment);
    toast.success("✅ Bình luận đã được gửi!");
    setContent("");
    setRating(5);
    fetchComments();
  };

  const getUserName = (userId: number): string => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Ẩn danh";
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("http://localhost:3000/users");
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const indexOfLast = currentPage * commentsPerPage;
  const indexOfFirst = indexOfLast - commentsPerPage;
  const currentComments = comments.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  //tính logic đánh giá
  // Đếm tổng số sao & trung bình
  const totalComments = comments.length;
  const totalRating = comments.reduce((sum, cmt) => sum + cmt.rating, 0);
  const averageRating = totalComments
    ? (totalRating / totalComments).toFixed(1)
    : "0.0";

  // Đếm số lượng đánh giá theo sao
  const ratingCounts = [1, 2, 3, 4, 5].reduce((acc, star) => {
    acc[star] = comments.filter((c) => c.rating === star).length;
    return acc;
  }, {} as Record<number, number>);

  // Tính phần trăm mỗi loại sao
  const ratingPercentages = [1, 2, 3, 4, 5].reduce((acc, star) => {
    acc[star] = totalComments
      ? Math.round((ratingCounts[star] / totalComments) * 100)
      : 0;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="mt-10">
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-bold mb-4">Đánh giá & Bình luận</h2>

      <div>
        <div className="flex items-center gap-2">
          <div className="text-3xl font-bold text-gray-800">
            {"★".repeat(Math.round(Number(averageRating)))}
          </div>
          <span className="text-green-600 text-2xl font-semibold">
            {averageRating}
          </span>
          <span className="text-gray-500">({totalComments})</span>
        </div>

        <div className="mt-2 space-y-1">
          {[5, 4, 3, 2, 1].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <span className="text-gray-700">{num}★</span>
              <div className="w-64 h-2 bg-gray-300 rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${ratingPercentages[num]}%` }}
                ></div>
              </div>
              <span className="text-gray-500">({ratingCounts[num] || 0})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bình luận mới */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Đánh giá:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded mb-2"
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star} ★
            </option>
          ))}
        </select>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full border rounded p-2"
          placeholder="Nhập bình luận của bạn..."
        />
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Gửi bình luận
        </button>
      </div>

      {/* Danh sách bình luận */}
      <div className="space-y-4">
        {currentComments.map((cmt) => (
          <div key={cmt.id} className="border-b pb-3">
            <div className="flex items-center justify-between">
              <div className="text-green-700 font-semibold">
                {getUserName(cmt.userId)}
              </div>
              <div className="flex items-center gap-2 text-yellow-500">
                {"★".repeat(cmt.rating)}
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(cmt.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p className="text-gray-800 mt-1">{cmt.content}</p>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex gap-2 mt-4">
        {Array.from({
          length: Math.ceil(comments.length / commentsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
