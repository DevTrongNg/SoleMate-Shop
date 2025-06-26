import React, { useEffect, useState } from "react";
import { IProduct } from "../interface/product";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ICategory } from "../interface/category";

type Props = {};

const Home = (props: Props) => {
  const [products, SetProduct] = useState<IProduct[]>([]);

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    if (categoryId) {
      navigate(`/category/${categoryId}`); // Chuyển trang đến danh mục đã chọn
    }
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    navigate("/allProduct"); // Chuyển trang khi chọn danh mục
  };

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
  return (
    <div>
      <header>
        <div className="w-full mx-auto  bg-gradient-to-r from-[#4E7C32] to-[#b7a7a7] py-[5px] text-white">
          <div className="container max-w-[1200px] mx-auto">
            <div className="top max-w-[1440px] flex items-center justify-around border-b-[1px] border-white py-[10px]">
              <div className="w-[550px] h-full flex items-center text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 relative left-[510px] text-black"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  type="text"
                  className="w-full max-w-[525px] max-h-[43px] p-2 border border-gray-300 rounded-md outline-none"
                  placeholder="Suchen Sie nach Produkten, Marken und mehr"
                />
                {/* <input type="text" className="w-full max-w-[525px] max-h-[43px] p-2 border border-gray-300 rounded-md outline-none" placeholder="Suchen Sie nach Produkten, Marken und mehr"> */}
              </div>
              <h4>En</h4>
              <div className="icon flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <h4>Cart</h4>
              </div>
            </div>
            <div className="flex justify-around py-[5px] text-white">
              <h4>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="bg-transparent border-none outline-none text-white w-28"
                  >
                    <option value="" className="text-white">
                      Beleuchtung
                    </option>
                    {categorie.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        className="text-black"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
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

        <div className="w-full bg-gradient-to-r from-[#B5DCB0] to-[#F9F3EE]">
          <div className="container w-[1200px] h-[597px] mx-auto bg-[url('/img/1.png')] bg-auto flex items-center px-10">
            <div className="w-[650px] h-[300px]">
              <h2 className="font-baloo text-[#505F4E] text-[55px] font-bold no-underline leading-[1.2]">
                Wir kümmern uns um Ihre <br /> schöner Garten und Haus
              </h2>
              <p className="w-[500px] font-poppins text-[15px] text-[#665345] my-[10px] leading-[1.5]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
              <button className="border-2 border-[#505F4E] px-5 py-2 my-[10px] font-poppins text-[15px] text-[#665345] hover:bg-[#505F4E] hover:text-white transition-all">
                Lern mehr
              </button>
            </div>
          </div>
        </div>
        
      </header>
      <main className="bg-[#F8F4F0] py-5 relative">
        <div className="container w-[1200px] mx-auto">
          <div className="w-full mt-4 border-b-[1px] border-[#e6e6e6] font-baloo text-[30px] font-bold text-[#505F4E]">
            <h3 className="">Best Sellers</h3>
          </div>
        </div>

        <div className="absolute top-[40px] mt-12 left-0 w-screen h-[400px] bg-white z-0"></div>

        <div className="container w-[1200px] mx-auto relative z-10">
          <div className="container mx-auto mt-5">
            <div className="grid grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center p-5"
                >
                  <div className="h-[30px]"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: 205, height: 220 }}
                  />
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
          </div>
        </div>

        <div className="container w-[1034px] h-[565px] mx-auto my-20 relative z-20 grid grid-cols-2 gap-4">
          <div className="w-full h-full bg-[url(img/3.png)] bg-cover py-3">
            <div className="w-full bg-gradient-to-r from-[#ffffff] to-[#a3a3a3] opacity-50 px-5 font-bold text-[25px]">
              Garten Spaten
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full h-full bg-[url(img/3.png)] bg-cover py-3">
              <div className="w-full bg-gradient-to-r from-[#ffffff] to-[#a3a3a3] opacity-50 px-5 font-bold text-[25px]">
                Garten Spaten
              </div>
            </div>
            <div className="w-full h-full bg-[url(img/3.png)] bg-cover py-3">
              <div className="w-full bg-gradient-to-r from-[#ffffff] to-[#a3a3a3] opacity-50 px-5 font-bold text-[25px]">
                Garten Spaten
              </div>
            </div>
            <div className="w-full h-full bg-[url(img/3.png)] bg-cover py-3">
              <div className="w-full bg-gradient-to-r from-[#ffffff] to-[#a3a3a3] opacity-50 px-5 font-bold text-[25px]">
                Garten Spaten
              </div>
            </div>
            <div className="w-full h-full bg-[url(img/3.png)] bg-cover py-3">
              <div className="w-full bg-gradient-to-r from-[#ffffff] to-[#a3a3a3] opacity-50 px-5 font-bold text-[25px]">
                Garten Spaten
              </div>
            </div>
          </div>
        </div>
        <div className="container w-[1200px] mx-auto">
          <div className="w-full border-b-[1px] border-[#e6e6e6] font-baloo text-[30px] font-bold text-[#505F4E]">
            <h3 className="">Kategorien</h3>
          </div>

          <div className="grid grid-cols-4 gap-4 my-10">
            <div className="relative max-w-[303px] h-[347px] bg-[url('https://ts2.mm.bing.net/th?id=OIP.IQSB4dIi608tNfdnNmnZCQHaHA&pid=15.1')] bg-cover p-6 text-end text-white">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="relative z-10">
                <h4 className="font-bold">Beleuchtung</h4>
                <p>30 items</p>
              </div>
            </div>

            <div className="relative max-w-[303px] h-[347px] bg-[url('https://ts4.mm.bing.net/th?id=OIP.4kWVgufrc-5auVN3qCtOFwHaHa&pid=15.1')] bg-cover p-6 text-end text-white">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="relative z-10">
                <h4 className="font-bold">Beleuchtung</h4>
                <p>30 items</p>
              </div>
            </div>
            <div className="relative max-w-[303px] h-[347px] bg-[url('https://ts1.mm.bing.net/th?id=OIP.2eraOy7q9SJWLo3edgoOHwHaHa&pid=15.1')] bg-cover p-6 text-end text-white">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="relative z-10">
                <h4 className="font-bold">Beleuchtung</h4>
                <p>30 items</p>
              </div>
            </div>
            <div className="relative max-w-[303px] h-[347px] bg-[url('https://ts1.mm.bing.net/th?id=OIP.f3Cky6RIpQxoj9XcKg3MjAHaGK&pid=15.1')] bg-cover p-6 text-end text-white">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="relative z-10">
                <h4 className="font-bold">Beleuchtung</h4>
                <p>30 items</p>
              </div>
            </div>
            <div className="relative max-w-[303px] h-[347px] bg-[url('https://th.bing.com/th/id/OIP.3Wu_PLBo0E6EbN78StsGtQHaEJ?w=270&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7')] bg-cover p-6 text-end text-white">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="relative z-10">
                <h4 className="font-bold">Beleuchtung</h4>
                <p>30 items</p>
              </div>
            </div>
            <div className="relative max-w-[303px] h-[347px] bg-[url('https://th.bing.com/th/id/OIP.rno87sR5tdifogBmK0hR4gHaEJ?w=267&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7')] bg-cover p-6 text-end text-white">
              <div className="absolute inset-0 bg-black opacity-30"></div>

              <div className="relative z-10">
                <h4 className="font-bold">Beleuchtung</h4>
                <p>30 items</p>
              </div>
            </div>
            <div className="relative max-w-[303px] h-[347px] bg-[url('https://th.bing.com/th/id/OIP.zDVf_Nz1wl6t4JJ8Dm1GpgHaGC?pid=ImgDet&w=184&h=150&c=7&dpr=1.3')] bg-cover p-6 text-end text-white">
              <div className="absolute inset-0 bg-black opacity-30"></div>

              <div className="relative z-10">
                <h4 className="font-bold">Beleuchtung</h4>
                <p>30 items</p>
              </div>
            </div>
            <div className="relative max-w-[303px] h-[347px] bg-[url('https://th.bing.com/th/id/OIP.VL_OGay6isAa5UF1RAjxvQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3')] bg-cover p-6 text-end text-white">
              <div className="absolute inset-0 bg-black opacity-30"></div>

              <div className="relative z-10">
                <h4 className="font-bold">Beleuchtung</h4>
                <p>30 items</p>
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
                  className="min-w-[550px] min-h-[63px] pl-[50px] outline-none"
                  placeholder="youremail123@gmail.com"
                />
              </div>
              <button className="relative min-w-[160px] min-h-[55px] text-center bg-[#656C66] text-white bottom-[70px] left-[414px]">
                ABONNIEREN
              </button>
            </div>
          </div>
        </div>
      </main>
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
