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
  const [newComment, setNewComment] = useState<{ content: string }>({ content: "" });

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
      rating: 5, // hoặc cho người dùng chọn đánh giá sao nếu muốn
    };

    try {
      const { data } = await axios.post("http://localhost:3000/comment", comment);
      setComments([...comments, data]);
      setNewComment({ content: "" });
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  return (
    <div className="mt-10">
      {/* Phần tổng quan */}
      <div className="flex items-center gap-6">
        <img
          src="https://png.pngtree.com/png-clipart/20220909/original/pngtree-dangerous-barrel-png-image_8508231.png"
          alt="Product"
          className="w-40 h-40 object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-gray-800">★★★★★</div>
            <span className="text-green-600 text-2xl font-semibold">5.0</span>
            <span className="text-gray-500">({comments.length})</span>
          </div>
        </div>
      </div>

      {/* Form bình luận */}
      <div className="mt-6">
        <textarea
          placeholder="Viết bình luận của bạn..."
          value={newComment.content}
          onChange={(e) => setNewComment({ content: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleSubmit}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Gửi bình luận
        </button>
      </div>

      {/* Danh sách bình luận */}
      <div className="mt-8 space-y-6">
        {comments.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <h4 className="text-green-700 font-semibold text-lg flex items-center">
              {review.name}
              <span className="ml-2 text-black">{"★".repeat(review.rating)}</span>
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
