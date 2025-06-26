import React, { useEffect, useState } from "react";
import axios from "axios";

interface IComment {
  id?: number;
  name: string;
  rating: number;
  content: string;
}

const ReviewSection = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState({ content: "", rating: 5 });

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/comment");
      setComments(data);
    } catch (err) {
      console.error("Lỗi khi lấy comment:", err);
    }
  };

  const handleSubmit = async () => {
    if (!user) return alert("Bạn cần đăng nhập để bình luận!");
    if (!newComment.content.trim()) return alert("Nội dung bình luận không được để trống");

    const comment: IComment = {
      name: user.name,
      content: newComment.content,
      rating: newComment.rating,
    };

    try {
      const { data } = await axios.post("http://localhost:3000/comment", comment);
      setComments([...comments, data]);
      setNewComment({ content: "", rating: 5 });
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  return (
    <div className="mt-10">
      {/* Tổng quan */}
      <div className="flex items-center gap-6">
        <img
          src="https://png.pngtree.com/png-clipart/20220909/original/pngtree-dangerous-barrel-png-image_8508231.png"
          alt="Product"
          className="w-40 h-40 object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-gray-800">★★★★★</div>
            <span className="text-green-600 text-2xl font-semibold">
              {(comments.reduce((sum, c) => sum + c.rating, 0) / (comments.length || 1)).toFixed(1)}
            </span>
            <span className="text-gray-500">({comments.length})</span>
          </div>
        </div>
      </div>

      {/* Viết đánh giá */}
      <div className="mt-6">
        <textarea
          placeholder="Viết bình luận..."
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        {/* Chọn sao */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-700">Đánh giá:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setNewComment({ ...newComment, rating: star })}
              className={star <= newComment.rating ? "text-yellow-400 text-xl" : "text-gray-400 text-xl"}
            >
              ★
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Gửi bình luận
        </button>
      </div>

      {/* Danh sách đánh giá */}
      <div className="mt-8 space-y-6">
        {comments.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <h4 className="text-green-700 font-semibold text-lg flex items-center">
              {review.name}
              <span className="ml-2 text-yellow-500">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </span>
            </h4>
            <p className="text-gray-700">{review.content}</p>
          </div>
        ))}
      </div>

      <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
        Xem tất cả
      </button>
    </div>
  );
};

export default ReviewSection;
