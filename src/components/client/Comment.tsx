import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { IUser } from "../../interface/user";
interface IComment {
  id: number;
  userId: number;
  content: string;
  rating: number;
  date: string;
}

const ReviewSection = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const [users, setUsers] = useState<IUser[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchComments = async () => {
    const { data } = await axios.get("http://localhost:3000/comment");
    setComments(data.reverse());
  };

  const handleSubmit = async () => {
    if (!user) return toast.error("Bạn phải đăng nhập để bình luận!");

    const newComment = {
      userId: user.id,
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
  
  // Giả sử bạn đã có danh sách users từ API
  const getUserName = (userId: number): string => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Ẩn danh";
  };
  useEffect(() => {
    fetchComments();
  }, []);
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

  return (
    <div className="mt-10">
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-bold mb-4">Đánh giá & Bình luận</h2>

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
