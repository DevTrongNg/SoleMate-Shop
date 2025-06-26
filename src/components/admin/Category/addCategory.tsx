import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IcategoriesForm } from '../../interface/category'
import axios from 'axios';

import { useNavigate } from 'react-router-dom'

type Props = {}
type ICategory = {
    id:number|string,
    name:string
}
const AddCategoty = (props: Props) => {
    const {register,handleSubmit,formState:{errors}} = useForm<IcategoriesForm>()
    const [categorys,setCategorys]= useState<ICategory[]>([])
    useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.get('http://localhost:3000/categories');
            console.log("Categories:", data); // Kiểm tra dữ liệu trả về
            setCategorys(data);
          } catch (error) {
            console.error("Lỗi API:", error);
          }
        })();
      }, []);
      
    const navigate = useNavigate()
    const onSubmit = async (category:IcategoriesForm)=>{
        try {
            const {data} = await axios.post(`http://localhost:3000/categories`,category)
            alert('Thêm mới thành công')
            navigate('/dashboard/category-list')
        } catch (error) {
            console.log(error);            
        }
    }
  return (
    <div className='max-w-2xl mx-auto py-10'>
        <h1 className='font-bold text-[24px] text-center'>Thêm mới danh mục</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4 [&_input]:border [&_input]:py-1 [&_input]:px-3'>
            <input {...register("name",{required:true,minLength:5})} type='text' placeholder='Tên sản phẩm'/>
            {(errors.name)&&<span className='text-red-600 text-[12px]'>Tên không được để trống và ít nhất 5 kí tự</span>}
            <div className='flex justify-end'>
            <button className='bg-green-900 text-white py-1 px-4 rounded'>Thêm mới danh mục</button>
            </div>
        </form>
    </div>
  )
}

export default AddCategoty