import React from "react";
import { ILoginForm } from "../../interface/user";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ILoginForm>();
  const navigate = useNavigate();
  const onSubmit = async (user: ILoginForm) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/login`, user);
      alert("Đăng nhập thành công");
      navigate("/");
    } catch (error: any) {
      alert(error.response.data ?? error.message);
      console.log(error);
    }
  };
  return (
    <div>
        

      <div className="max-w-md mx-auto my-10 py-12 px-8 bg-white shadow-lg rounded-lg ">
      <h1 className="font-bold text-2xl text-center text-gray-800">Đăng nhập tài khoản</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              pattern: /^\S+@+(\S+\.)+[a-zA-Z]{2,6}$/,
              required: true,
            })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.email && (
            <span className="text-red-600 text-sm">Email không đúng định dạng</span>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Mật khẩu"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <a href="/register" className="text-green-700 hover:underline">Đăng ký</a>
        </div>
        <button className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition duration-200">
          Đăng nhập
        </button>
      </form>
    </div>

    
    </div>
  );
};

export default Login;
