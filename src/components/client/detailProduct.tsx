import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../interface/product";

const DetailProduct = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState<IProduct | null>(null);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    

      <div className="container w-[1200px] mx-auto my-[30px] flex justify-between">
        <div className="flex flex-col items-center">
          {/* Hình ảnh chính */}
          <img
            className="w-[400px] h-[400px] object-cover mb-4  rounded-lg"
            src={product.image}
            alt={product.name}
          />

          {/* Nhóm hình ảnh nhỏ */}
          <div className="flex gap-4">
            <img
              className="w-[106px] h-[106px] object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
              src={product.image}
              alt={product.name}
            />
            <img
              className="w-[106px] h-[106px] object-cover  rounded-lg cursor-pointer hover:scale-105 transition-transform"
              src={product.image}
              alt={product.name}
            />
            <img
              className="w-[106px] h-[106px] object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
              src={product.image}
              alt={product.name}
            />
          </div>
        </div>

        <div className="flex justify-center w-auto pr-[100px]">
          <div className="w-[550px]">
            <h4 className="font-kumbn text-[#4E7C32]">Plant</h4>
            <h2 className="font-kumbn font-bold text-[44px]">
              {" "}
              <h1>{product.name}</h1>
              0.27 to 2 litres
            </h2>
            <p className="font-kumbn text-[#68707D] text-[16px] my-[10px] mt-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
            <div className="flex items-center mt-6">
              <h4 className="font-kumbn font-bold text-[30px] mr-3">
                <h2>{product.price} VND</h2>
              </h4>
              <p className="bg-[#FFEDE0] px-[10px] py-[2px] rounded-[5px]">
                50%
              </p>
            </div>
            <p className="line-through font-bold mb-5">$250.00</p>

            <div className="flex items-center space-x-4 mt-6">
              <button className="w-10 h-10 bg-gray-300 text-gray-800 font-bold rounded-full">
                -
              </button>
              <span className="text-xl font-bold">1</span>
              <button className="w-10 h-10 bg-gray-300 text-gray-800 font-bold rounded-full">
                +
              </button>
              <button className="w-[273px] h-[54px] bg-[#4E7C32] text-white font-bold rounded-[10px]">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

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
        <div className="mt-10">
          {/* Phần trên: Ảnh + Đánh giá */}
          <div className="flex items-center gap-6">
            {/* Ảnh sản phẩm */}
            <img
              src="https://png.pngtree.com/png-clipart/20220909/original/pngtree-dangerous-barrel-png-image_8508231.png"
              alt="Product"
              className="w-40 h-40 object-cover"
            />

            {/* Đánh giá */}
            <div>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-gray-800">★★★★★</div>
                <span className="text-green-600 text-2xl font-semibold">
                  5.0
                </span>
                <span className="text-gray-500">(388)</span>
              </div>

              {/* Thanh tiến trình đánh giá */}
              <div className="mt-2 space-y-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex items-center gap-2">
                    <span className="text-gray-700">{num}★</span>
                    <div className="w-64 h-2 bg-gray-300 rounded-full">
                      <div
                        className={`h-full bg-gray-500 rounded-full w-${
                          num * 10
                        }`}
                      ></div>
                    </div>
                    <span className="text-gray-500">(388)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nút Viết đánh giá */}
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Write reviews
          </button>

          {/* Danh sách đánh giá */}
          <div className="mt-8 space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b pb-4">
                <h4 className="text-green-700 font-semibold text-lg flex items-center">
                  Aman Gupta <span className="ml-2 text-black">★★★★★</span>
                </h4>
                <p className="text-gray-700">
                  I've been using this cleanser for about five or six months now
                  and my acne is almost completely gone. 100% recommend and will
                  continue to use for sure.
                </p>
              </div>
            ))}
          </div>

          {/* Nút See all */}
          <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            See all
          </button>
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
     
    </div>
  );
};

export default DetailProduct;
