import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const navigate = useNavigate();

  // Trong Login.tsx:
  const onSubmit = async (user: ILoginForm) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/login`, user);

      const role = data.user.role || "client";

      toast.success("✅ Đăng nhập thành công!");

      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => {
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (error: any) {
      toast.error(
        "❌ Đăng nhập thất bại: " + (error.response?.data || error.message)
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="bottom-right" autoClose={2000} />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập tài khoản
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email"
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email không đúng định dạng",
                },
              })}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password", {
                required: "Mật khẩu không được để trống",
              })}
              placeholder="Mật khẩu"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-between text-sm text-green-700">
            <a href="/register" className="hover:underline">
              Bạn chưa có tài khoản? Đăng ký
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
