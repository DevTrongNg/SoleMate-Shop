import React, { useEffect, useState } from 'react';
import { IProduct } from '../../interface/product';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { ICategory } from '../../interface/category';

type Props = {};

const Home = (props: Props) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/products`);
                setProducts(data);
                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);
    
    useEffect(() => {
        const getCategory = async () => {
            try {
                const categories: AxiosResponse<ICategory[]> = await axios.get(`http://localhost:3000/categories`);
                setCategories(categories?.data);
                console.log(categories?.data);
                
            } catch (error) {
                console.log(error);
            }
        };
        getCategory();
    }, []);
      const getCategoryName = (categoryId: number | string) => {
          const category = categories.find((cat) => cat.id == categoryId);
          return category ? category?.name : 'Không có danh mục';
        };


    const delProduct = async (id: number | string) => {
        try {
            if (confirm('Bạn chắc chứ?')) {
                await axios.delete(`http://localhost:3000/products/${id}`);
                alert('Xóa thành công');
                const newProducts = products.filter((product) => product.id !== id);
                setProducts(newProducts);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full min-h-screen p-4 bg-gray-100">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="font-bold text-2xl text-center text-gray-800 mb-6">
                    Danh sách sản phẩm
                </h1>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 bg-white text-gray-800">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2">STT</th>
                                <th className="border px-4 py-2">Ảnh sản phẩm</th>
                                <th className="border px-4 py-2">Tên sản phẩm</th>
                                <th className="border px-4 py-2">Giá tiền</th>
                                <th className="border px-4 py-2">Danh mục</th>
                                <th className="border px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-2 py-1 text-center">
                                        <img
                                            className="w-24 h-24 object-cover mx-auto"
                                            src={product.image}
                                            alt={product.name}
                                        />
                                    </td>
                                    <td className="border px-4 py-2">{product.name}</td>
                                    <td className="border px-4 py-2 text-center">{product.price}</td>

                                    <td className="border px-4 py-2 text-center">
                                        {getCategoryName(product?.categoryId)}
                                    </td>

                                    <td className="border px-4 py-2 flex justify-center space-x-2">
                                        <Link
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                            to={`/dashboard/product-edit/${product.id}`}
                                        >
                                            Sửa
                                        </Link>
                                        <button
                                            onClick={() => delProduct(product.id)}
                                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
