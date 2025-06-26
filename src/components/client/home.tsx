import React, { useEffect, useState } from "react";
import { IProduct } from "../../interface/product";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ICategory } from "../../interface/category";

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
    <main className="bg-[#F8F4F0] py-10 relative">
      <div className="w-full bg-gradient-to-r from-[#B5DCB0] to-[#F9F3EE]">
        <div className="container w-[1200px] h-[597px] mx-auto bg-[url('/img/1.png')] bg-auto flex items-center px-10">
          <div className="w-[650px] h-[300px]">
            <h2 className="font-baloo text-[#505F4E] text-[55px] font-bold no-underline leading-[1.2]">
              Wir kümmern uns um Ihre <br /> schöner Garten und Haus
            </h2>
            <p className="w-[500px] font-poppins text-[15px] text-[#665345] my-[10px] leading-[1.5]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
            <button className="border-2 border-[#505F4E] px-5 py-2 my-[10px] font-poppins text-[15px] text-[#665345] hover:bg-[#505F4E] hover:text-white transition-all">
              Lern mehr
            </button>
          </div>
        </div>
      </div>

      {/* Section: Best Sellers */}
      <section className="container w-[1200px] mx-auto relative z-10">
        <h3 className="text-[30px] font-bold text-[#505F4E] border-b pb-2 mb-8 font-baloo">
          Best Sellers
        </h3>

        <div className="absolute top-[40px] left-0 right-0 w-full  h-[400px] bg-white z-0"></div>

        <div className="relative grid grid-cols-4 gap-6 z-10">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center bg-white shadow-sm p-4 rounded"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-[205px] h-[220px] object-cover"
              />
              <h4 className="text-[#665345] font-bold my-3 text-center">
                <Link
                  to={`/detailProduct/${product.id}`}
                  className="hover:underline"
                >
                  {product.name}
                </Link>
              </h4>
              <div className="flex justify-between w-full text-sm">
                <p className="font-thin">Dress</p>
                <p className="font-medium">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Banner Grid */}
      <section className="container w-[1034px] mx-auto my-20 grid grid-cols-2 gap-4 relative z-10">
        <div className="w-full h-[565px] bg-[url(img/3.png)] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-400 opacity-50"></div>
          <div className="relative px-5 py-3 text-[25px] font-bold">
            Garten Spaten
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[273px] bg-[url(img/3.png)] bg-cover bg-center relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-400 opacity-50"></div>
              <div className="relative px-5 py-3 text-[25px] font-bold">
                Garten Spaten
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Kategorien */}
      <section className="container w-[1200px] mx-auto my-16">
        <h3 className="text-[30px] font-bold text-[#505F4E] border-b pb-2 mb-8 font-baloo">
          Kategorien
        </h3>

        <div className="grid grid-cols-4 gap-6">
          {[
            "https://ts2.mm.bing.net/th?id=OIP.IQSB4dIi608tNfdnNmnZCQHaHA&pid=15.1",
            "https://ts4.mm.bing.net/th?id=OIP.4kWVgufrc-5auVN3qCtOFwHaHa&pid=15.1",
            "https://ts1.mm.bing.net/th?id=OIP.2eraOy7q9SJWLo3edgoOHwHaHa&pid=15.1",
            "https://ts1.mm.bing.net/th?id=OIP.f3Cky6RIpQxoj9XcKg3MjAHaGK&pid=15.1",
            "https://th.bing.com/th/id/OIP.3Wu_PLBo0E6EbN78StsGtQHaEJ?w=270&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            "https://th.bing.com/th/id/OIP.rno87sR5tdifogBmK0hR4gHaEJ?w=267&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            "https://th.bing.com/th/id/OIP.zDVf_Nz1wl6t4JJ8Dm1GpgHaGC?pid=ImgDet&w=184&h=150&c=7&dpr=1.3",
            "https://th.bing.com/th/id/OIP.VL_OGay6isAa5UF1RAjxvQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
          ].map((url, index) => (
            <div
              key={index}
              className="relative h-[347px] bg-cover bg-center text-white p-6"
              style={{ backgroundImage: `url(${url})` }}
            >
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="relative z-10 text-end">
                <h4 className="font-bold">Beleuchtung</h4>
                <p>30 items</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Newsletter */}
      <section className="container max-w-[1000px] mx-auto mt-24 text-[#505F4E]">
        <h2 className="font-baloo text-[40px] font-bold leading-snug">
          Etwas abonnieren* <br />
          _Unser Newsletter
        </h2>

        <div className="flex gap-10 items-start mt-6">
          <p className="max-w-[345px] text-[14px]">
            Get weekly update about our product on your email, no spam
            guaranteed we promise ✌️
          </p>

          <div className="flex flex-col gap-2 w-full relative">
            <div className="relative">
              <input
                type="text"
                className="w-full h-[63px] pl-[50px] pr-4 outline-none border border-gray-300"
                placeholder="youremail123@gmail.com"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
            </div>
            <button className="w-[160px] h-[55px] bg-[#656C66] text-white font-semibold">
              ABONNIEREN
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
