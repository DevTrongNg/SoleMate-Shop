import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IProductForm } from "../../../interface/product";
import { ICategory } from "../../../interface/category";

type Props = {};

const EditProduct = (props: Props) => {
  const { register, handleSubmit, reset } = useForm<IProductForm>();
      const [categories, setCategories] = useState<ICategory[]>([]);
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
  
  // Lấy id sản phẩm
  const params: any = useParams();
  const id = params.id;
  useEffect(() => {
    const get_product_by_id = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        reset(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_product_by_id();
  }, []);
  
  const navigate = useNavigate();
  const onSubmit = async (product: IProductForm) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/products/${id}`,
        product
      );
      alert("Cập nhật thành công");
      navigate("/dashboard/product-list");
    } catch (error) {
      console.log(error);   
    }
  };
   
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="font-bold text-[24px] text-center">Cập nhật sản phẩm</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4 [&_input]:border [&_input]:py-1 [&_input]:px-3"
      >
        <input {...register("name")} type="text" placeholder="Tên sản phẩm" />
        <input {...register("image")} type="text" placeholder="Ảnh sản phẩm" />
        <input
          {...register("price")}
          type="number"
          placeholder="Giá sản phẩm"
        />

        <select {...register("categoryId")}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <button className="bg-green-900 text-white py-1 px-4 rounded">
            Cập nhật sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
