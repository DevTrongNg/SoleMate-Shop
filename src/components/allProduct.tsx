import React, { useEffect, useState } from "react";
import { IProduct } from "../interface/product";

import axios from "axios";
import { Link } from "react-router-dom";
import { ICategory } from "../interface/category";
import { ShoppingBag, Heart, Share2 } from "lucide-react";

type Props = {};

const Home = (props: Props) => {
  const [products, SetProduct] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const get_Products = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/products");
        SetProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_Products();
  }, []);

  const [categorie, Setcategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const get_categories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/categories`);
        Setcategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_categories();
  }, []);

  // Lọc sản phẩm theo danh mục
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;

  const delProduct = async (id: number | string) => {
    try {
      if (confirm("Bạn chắc chứ?")) {
        await axios.delete(`http://localhost:3000/products/${id}`);
        alert("Xóa thành công");
        const newProducts = products.filter((product) => product.id != id);
        SetProduct(newProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header>
        <div className="w-full h-[150px] mx-auto bg-gradient-to-r from-[#4E7C32] to-[#b7a7a7] py-[5px] text-white">
          <div className="container max-w-[1200px] mx-auto mt-8">
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
                <h4>
                  {" "}
                  <a href="/register"> Account</a>{" "}
                </h4>
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
              <h4>
                <a href="/allProduct">Beleuchtung</a>
              </h4>
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
      <div className="w-full bg-gradient-to-r from-[#B5DCB0] to-[#F9F3EE] py-[50px]">
        <div className="container w-[1200px] mx-auto font-baloo text-[#505F4E] text-[30px] font-bold">
          <h2>Töpfe & Behälter</h2>
        </div>
      </div>
      <div className="container w-[1200px] mx-auto my-[20px] flex justify-between">
        <div className="p-[5px] bg-[#D2E8CD] flex w-[180px] items-center justify-around rounded-lg">
          <img
            className="h-[45px] rounded-md"
            src="https://www.scentgod.com.au/img/media/6/0/60-1.jpg"
            alt=""
          />
          <h4>Eckige Töpfe</h4>
        </div>
        <div className="p-[5px] bg-[#D2E8CD] flex w-[180px] items-center justify-around rounded-lg">
          <img
            className="h-[45px] rounded-md"
            src="https://www.scentgod.com.au/img/media/6/0/60-1.jpg"
            alt=""
          />
          <h4>Eckige Töpfe</h4>
        </div>
        <div className="p-[5px] bg-[#D2E8CD] flex w-[180px] items-center justify-around rounded-lg">
          <img
            className="h-[45px] rounded-md"
            src="https://www.scentgod.com.au/img/media/6/0/60-1.jpg"
            alt=""
          />
          <h4>Eckige Töpfe</h4>
        </div>
        <div className="p-[5px] bg-[#D2E8CD] flex w-[180px] items-center justify-around rounded-lg">
          <img
            className="h-[45px] rounded-md"
            src="https://www.scentgod.com.au/img/media/6/0/60-1.jpg"
            alt=""
          />
          <h4>Eckige Töpfe</h4>
        </div>
      </div>
      <div className="container w-[1200px] mx-auto my-[70px] flex justify-between">
        <div className="w-[70%]">
          <div className="flex">
            <div className="mr-[30px]">
              <label className="text-[24px]">Sort By :</label>
              <select
                className="border border-gray-400 w-[220px] h-[45px] rounded-[10px] px-3"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Chọn danh mục</option>
                {categorie.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[24px]">Show :</label>
              <select
                name=""
                id=""
                className="border border-gray-400 w-[220px] h-[45px] rounded-[10px]"
              >
                <option value="1">Default</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 my-[30px]">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative p-[5px] font-bold group  transition duration-300"
              >
                <div className="h-[20px]"></div>
                <div className="relative">
                  <img
                    width={500}
                    src={product.image}
                    alt={product.name}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Hiệu ứng hover cho các nút */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                      <button className="bg-white p-3 rounded-lg shadow-md hover:bg-green-100 transition">
                        <Share2 className="text-green-700" size={20} />
                      </button>
                      <button className="bg-green-700 p-3 rounded-lg shadow-md hover:bg-green-800 transition">
                        <ShoppingBag className="text-white" size={20} />
                      </button>
                      <button className="bg-white p-3 rounded-lg shadow-md hover:bg-green-100 transition">
                        <Heart className="text-green-700" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <h4 className="text-[#000000] font-bold my-3">
                    <Link
                      to={`/detailProduct/${product.id}`}
                      className="hover:underline"
                    >
                      {product.name}
                    </Link>
                  </h4>
                  <div className="flex">
                    <p className="flex text-[#5b5555] mr-2">${product.price}</p>
                    <del className="flex text-[#bfb9b9] ">$950</del>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[25%] space-y-6">
          {/* Danh mục sản phẩm */}
          <div className="font-baloo text-[24px] font-bold text-[#505F4E]">
            <h3>Kategorien</h3>
          </div>
          <div className="space-y-2">
            {[
              "Eckige Töpfe",
              "Runde Töpfe",
              "Untersetzer",
              "Pflanzschalen",
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-2 text-[16px]"
              >
                <input type="checkbox" className="w-4 h-4 accent-green-600" />
                {item}
              </label>
            ))}
          </div>

          {/* Hình ảnh quảng cáo */}
          <div className="relative max-w-[213px] h-[262px] bg-[url('/img/home3.png')] bg-cover bg-center text-white my-6">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 flex flex-col justify-between p-4 h-full">
              <p className="font-bold text-[18px] leading-tight">
                Grow your own <br /> favourite plant
              </p>
              <button className="flex items-center gap-2 text-white font-medium">
                Shop Now ➜
              </button>
            </div>
          </div>

          {/* Bộ lọc giá */}
          <div className="space-y-2">
            <p className="font-bold text-[18px]">Filter By Price</p>
            <input type="range" className="w-full accent-green-600" />
            <div className="flex justify-between text-sm">
              <span>From $0 to $8000</span>
              <button className="text-green-700 font-semibold">Filter</button>
            </div>
          </div>

          {/* Bộ lọc kích thước */}
          <div className="space-y-2">
            <p className="font-bold text-[18px]">Filter By Size</p>
            <input type="range" className="w-full accent-green-600" />
            <div className="flex justify-between text-sm">
              <span>2 mm by 50</span>
              <button className="text-green-700 font-semibold">Filter</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1000px] mx-auto">
        <h2 className=" font-baloo text-[40px] font-bold text-[#505F4E] line">
          Etwas abonnieren* <br />
          _Unser Newsletter
        </h2>
        <div className="flex">
          <p className="max-w-[345px] p-[50px] font-poppins text-[14px]">
            Get weekly update about our product on your email, no spam
            guaranteed we promise ✌️
          </p>
          <div>
            <div className="flex items-center py-[50px]">
              <div className="min-w-[24px] min-h-[24px] relative left-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 max-w-20 max-h-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="min-w-[550px] min-h-[63px] pl-[50px] outline-none border border-gray-400 rounded-md"
                placeholder="youremail123@gmail.com"
              />
            </div>
            <button className="relative min-w-[160px] min-h-[55px] text-center bg-[#656C66] text-white bottom-[70px] left-[414px]">
              ABONNIEREN
            </button>
          </div>
        </div>
      </div>

      {/* <div className="container mx-auto mt-5">
        <div className="grid grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex flex-col items-center p-5 bg-white "
            >
              <div className="h-[30px]"></div>
              <img width={300} src={product.image} alt={product.name} />
              <div className="w-full">
                <h4 className="text-[#665345] font-bold my-3">
                  <Link
                    to={`/detailProduct/${product.id}`}
                    className="hover:underline"
                  >
                    {product.name}
                  </Link>
                </h4>
                <div className="flex justify-between w-full">
                  <p className="font-thin">Dress</p>
                  <p>${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

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

export default Home;
