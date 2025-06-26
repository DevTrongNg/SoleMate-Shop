import React, { useEffect, useState } from 'react'
import { ICategory } from '../../interface/category'
import axios from 'axios'
import { Link } from 'react-router-dom'

type Props = {}

const ListCategory = (props: Props) => {
    const [categories,Setcategories]= useState<ICategory[]>([])
    useEffect(()=>{
        const get_categories = async()=>{
            try {
                const {data} = await axios.get(`http://localhost:3000/categories`)
                Setcategories(data)
            } catch (error) {
                console.log(error);                
            }
        }
        get_categories()
    },[])
    const delcategories = async (id:number|string)=>{
        try {
            if (confirm("Bạn chắc chứ?")){
                await axios.delete(`http://localhost:3000/categories/${id}`)
                alert('Xóa thành công')
                const newcategories = categories.filter(categories=>categories.id!=id)
                Setcategories(newcategories)
            }
        } catch (error) {
            console.log(error);            
        }
    }
  return (
    <div className="w-full min-h-screen p-4 bg-gray-100">
  <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
    <h1 className="font-bold text-2xl text-center text-gray-800 mb-6">Danh sách sản phẩm</h1>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 bg-white text-gray-800">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">Tên danh mục</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((categories, index) => (
            <tr key={categories.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
             
              <td className="border px-4 py-2">{categories.name}</td>
           
              <td className="border px-4 py-2 flex justify-center space-x-2">
                <Link
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  to={`/dashboard/category-edit/${categories.id}`}
                >
                  Sửa
                </Link>
                <button
                  onClick={() => delcategories(categories.id!)}
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

  )
}

export default ListCategory