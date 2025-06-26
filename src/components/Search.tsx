// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { IProduct } from "../interface/product";
// import ProductItem from "./ProductItem"; // Đảm bảo import component
// import api from "../utils/api"; // Giả sử bạn dùng Axios và có file api.ts

// const Search = () => {
//   const [search] = useSearchParams();
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [keyword, setKeyword] = useState<string>("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const keywordParam = search.get("keyword") || "";
//         const { data } = await api.get(`products?name_like=${keywordParam}`);
//         setProducts(data);
//         setKeyword(keywordParam);
//       } catch (error) {
//         console.error("Lỗi khi tải sản phẩm:", error);
//       }
//     };

//     fetchProducts();
//   }, [search]); // Thêm search vào dependency để cập nhật khi URL thay đổi

//   return (
//     <div>
//       <h1>
//         Kết quả tìm kiếm theo từ khóa: <strong>{keyword}</strong>
//       </h1>
//       <div>
//         {products.map((product: IProduct) => (
//           <ProductItem key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Search;
