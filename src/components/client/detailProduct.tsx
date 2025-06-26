import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../interface/product";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReviewSection from "./Comment";

const DetailProduct = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    content: "",
  });



  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart];
    const index = updatedCart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      updatedCart[index].quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Hiển thị toast thay cho alert
    toast.success(`✅ Đã thêm ${quantity} x ${product.name} vào giỏ hàng!`);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="container w-[1200px] mx-auto my-[30px] flex justify-between">
        {/* LEFT - Hình ảnh */}
        <div className="flex flex-col items-center">
          <img
            className="w-[400px] h-[400px] object-cover mb-4 rounded-lg"
            src={product.image}
            alt={product.name}
          />

          <div className="flex gap-4">
            {[1, 2, 3].map((_, i) => (
              <img
                key={i}
                className="w-[106px] h-[106px] object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                src={product.image}
                alt={`Thumb ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT - Thông tin sản phẩm */}
        <div className="flex justify-center w-auto pr-[100px]">
          <div className="w-[550px]">
            <h4 className="text-[#4E7C32] font-semibold mb-1">Plant</h4>
            <h2 className="text-[32px] font-bold leading-tight">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4">0.27 to 2 litres</p>

            <p className="text-[#68707D] text-[16px] my-[10px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>

            <div className="flex items-center mt-4 space-x-3">
              <h4 className="text-[26px] font-bold text-[#4E7C32]">
                {product.price} VND
              </h4>
              <span className="bg-[#FFEDE0] px-2 py-1 rounded text-sm font-semibold text-red-500">
                50%
              </span>
            </div>
            <p className="line-through font-bold text-gray-400 mt-1 mb-4">
              $250.00
            </p>

            {/* Số lượng + Thêm giỏ hàng */}
            <div className="flex items-center space-x-4 mt-6">
              <button
                onClick={decreaseQty}
                className="w-10 h-10 bg-gray-300 text-gray-800 font-bold rounded-full"
              >
                -
              </button>
              <span className="text-xl font-bold">{quantity}</span>
              <button
                onClick={increaseQty}
                className="w-10 h-10 bg-gray-300 text-gray-800 font-bold rounded-full"
              >
                +
              </button>
              <button
                onClick={handleAddToCart}
                className="w-[200px] h-[54px] bg-[#4E7C32] text-white font-bold rounded-[10px]"
              >
                Add to cart
              </button>
              <ToastContainer position="bottom-right" autoClose={2000} />
            </div>
          </div>
        </div>
      </div>
      {/* //and */}
      <div className="container w-[1200px] mx-auto my-[50px] mt-20">
        <div className="pr-[250px] mb-[20px]">
          <h3 className="font-kumbn text-[#4E7C32] text-[30px]">Discription</h3>
          <p className="font-kumbn text-[#665345] text-[20px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled i
          </p>
        </div>
        <div className="pr-[250px]">
          <h3 className="font-kumbn text-[#4E7C32] text-[30px]">About</h3>
          <p className="font-kumbn text-[#665345] text-[20px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled i
          </p>
        </div>
        {/* đánh giá */}
        <ReviewSection />
        {/* and đánh giá */}
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
    </div>
  );
};

export default DetailProduct;
