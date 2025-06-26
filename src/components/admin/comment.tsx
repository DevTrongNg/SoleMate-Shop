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
  image: string;
}

const CommentStats = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [filterRating, setFilterRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleViewDetails = (productId: number) => {
    setSelectedProductId(productId === selectedProductId ? null : productId);
  };

  const getCommentsByProduct = (productId: number) =>
    comments.filter((c) => c.productId === productId);

  const getAverageRating = (productId: number) => {
    const productComments = getCommentsByProduct(productId);
    if (productComments.length === 0) return 0;
    const total = productComments.reduce((sum, c) => sum + c.rating, 0);
    return parseFloat((total / productComments.length).toFixed(1));
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return "★".repeat(fullStars) + (half ? "½" : "") + "☆".repeat(5 - fullStars - (half ? 1 : 0));
  };

  const filteredProducts = products.filter((p) => {
    const avg = getAverageRating(p.id);
    const matchRating = filterRating === 0 || avg >= filterRating;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRating && matchSearch;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-bold mb-6">Thống kê đánh giá sản phẩm</h2>

      {/* Bộ lọc và tìm kiếm */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">Lọc theo sao:</label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
            className="border px-3 py-1 rounded"
          >
            <option value={0}>Tất cả</option>
            <option value={5}>5★ trở lên</option>
            <option value={4}>4★ trở lên</option>
            <option value={3}>3★ trở lên</option>
            <option value={2}>2★ trở lên</option>
            <option value={1}>1★ trở lên</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 rounded w-full md:w-1/3"
        />
      </div>

      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Ảnh</th>
            <th className="py-3 px-4 text-left">Tên sản phẩm</th>
            <th className="py-3 px-4 text-left">Bình luận</th>
            <th className="py-3 px-4 text-left">Trung bình đánh giá</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => {
            const productComments = getCommentsByProduct(product.id);
            const avgRating = getAverageRating(product.id);
            const isOpen = selectedProductId === product.id;

            return (
              <React.Fragment key={product.id}>
                <tr className="border-t hover:bg-gray-50 transition">
                  <td className="py-2 px-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4 font-medium text-green-700">
                    {productComments.length} bình luận
                  </td>
                  <td className="py-2 px-4 text-yellow-600">
                    {renderStars(avgRating)} ({avgRating})
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                      onClick={() => handleViewDetails(product.id)}
                    >
                      {isOpen ? "Ẩn chi tiết" : "Xem chi tiết"}
                    </button>
                  </td>
                </tr>

                {/* Chi tiết bình luận */}
                {isOpen && (
                  <tr>
                    <td colSpan={5} className="bg-gray-50 px-4 py-3">
                      {productComments.length === 0 ? (
                        <p className="text-gray-500">Không có bình luận.</p>
                      ) : (
                        productComments.map((cmt) => (
                          <div
                            key={cmt.id}
                            className="border border-gray-300 rounded-md p-3 mb-2"
                          >
                            <div className="flex justify-between items-center">
                              <div className="text-yellow-500">
                                {"★".repeat(cmt.rating)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(cmt.date).toLocaleDateString()}
                              </div>
                            </div>
                            <p className="text-gray-800 mt-1">{cmt.content}</p>
                          </div>
                        ))
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommentStats;
