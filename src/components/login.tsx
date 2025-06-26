import React from "react";
import { ILoginForm } from "../interface/user";
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
          <header>
        <div className="w-full mx-auto bg-gradient-to-r from-[#4E7C32] to-[#b7a7a7] py-[5px] text-white">
          <div className="container max-w-[1200px] mx-auto">
            <div className="top max-w-[1440px] flex items-center justify-around border-b-[1px] border-white py-[10px]">
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
                  placeholder="Suchen Sie nach Produkten, Marken und mehr"
                />
              </div>
              <h4>En</h4>
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
                
              </div>
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
            </div>
            <div className="flex justify-around py-[5px] text-white">
              <h4>Beleuchtung</h4>
              <h4>Growbox</h4>
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

    <footer className="w-full bg-[#053D29] text-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto flex justify-between py-14">
          {/* Cột 1 - Giới thiệu & Social Media */}
          <div className="max-w-[300px]">
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-4 mt-4">
              <img src="img/facebook.png" alt="Facebook" className="h-5" />
              <img src="img/twitter.png" alt="Twitter" className="h-5" />
              <img src="img/linkedin.png" alt="LinkedIn" className="h-5" />
              <img src="img/twitter.png" alt="YouTube" className="h-5" />
              <img src="img/linkedin.png" alt="Instagram" className="h-5" />
            </div>
          </div>

          {/* Cột 2 - Um */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Um</h4>
            <ul className="space-y-2 text-sm">
              <li>Kontaktiere uns</li>
              <li>Über uns</li>
              <li>Karriere</li>
              <li>Unternehmensinformationen</li>
            </ul>
          </div>

          {/* Cột 3 - Hilfe */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Hilfe</h4>
            <ul className="space-y-2 text-sm">
              <li>Unsere Produzenten</li>
              <li>Zahlung</li>
              <li>Versand</li>
              <li>Stornierung & Rückgabe</li>
              <li>Verstoß Melden</li>
            </ul>
          </div>

          {/* Cột 4 - Politik */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Politik</h4>
            <ul className="space-y-2 text-sm">
              <li>Rücknahmegarantie</li>
              <li>Nutzungsbedingungen</li>
              <li>Sicherheit</li>
              <li>Privatsphäre</li>
              <li>Seitenverzeichnis</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-[#062F21] text-[#E5E7EB] py-4 flex justify-between items-center px-10">
          <span className="text-sm">2023 hood.de, Inc.</span>

          {/* Payment Icons */}
          <div className="flex gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="MasterCard"
              className="h-6"
            />
            <img
              src="https://th.bing.com/th/id/OIP.ZvTUoMqAhkKCo0wlrZgozgHaHa?rs=1&pid=ImgDetMain"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://th.bing.com/th/id/OIP.Y6-wJg-HiIJqiI8nok881AHaFr?w=208&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="American Express"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="MasterCard"
              className="h-6"
            />
          </div>

          {/* Scroll to top */}
          <button className="text-sm flex items-center gap-1">
            Scroll to top <span>⬆</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Login;
