import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ClientHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.info("🚪 Đã đăng xuất!");
    navigate("/login");
  };

  return (
    <header>
      <ToastContainer position="bottom-right" autoClose={1500} />
      <div className="w-full mx-auto bg-gradient-to-r from-[#4E7C32] to-[#b7a7a7] py-[5px] text-white">
        <div className="w-[150px] flex items-center">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white ml-4">SoleMate</span>
          </a>
        </div>

        <div className="container max-w-[1200px] mx-auto">
          <div className="top max-w-[1440px] flex items-center justify-around border-b-[1px] border-white py-[10px]">
            {/* Ô tìm kiếm */}
            <div className="w-[550px] h-full flex items-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 relative left-[510px] text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                className="w-full max-w-[525px] max-h-[43px] p-2 border border-gray-300 rounded-md outline-none"
                placeholder="Tìm sản phẩm, thương hiệu..."
              />
            </div>

            <h4>En</h4>

            {/* Nếu chưa đăng nhập */}
            {!user ? (
              <a href="/register">
                <div className="icon flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <h4>Account</h4>
                </div>
              </a>
            ) : (
              // Nếu đã đăng nhập
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-green-700 shadow-sm">
                <span className="font-medium text-sm">👋 {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:underline transition"
                >
                  Đăng xuất
                </button>
              </div>
            )}

            {/* Giỏ hàng */}
            <a href="/cart">
              <div className="icon flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <h4>Cart</h4>
              </div>
            </a>
          </div>

          {/* Menu */}
          <div className="flex justify-around py-[5px] text-white">
            <a href="allProduct">
              {" "}
              <h4>Growbox</h4>
            </a>
            <h4>Dünger</h4>
            <h4>Erde & Substrate</h4>
            <h4>Töpfe & Behälter</h4>
            <h4>Bewässerung</h4>
            <h4>Pflanzen & Gärtnern</h4>
            <h4>Lüftung & Klimaanlage</h4>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
