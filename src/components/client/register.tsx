import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IRegisterForm } from '../../interface/user'

type Props = {}

const Register = (props: Props) => {
    const {register,handleSubmit,formState:{errors},watch} = useForm<IRegisterForm>()
    const navigate = useNavigate()
    const onSubmit = async (user:IRegisterForm)=>{
        try {
            const {data} = await axios.post(`http://localhost:3000/register`,user)
            alert('Đăng ký thành công')
            // console.log(data);
            navigate('/login')
        } catch (error:any) {
            alert(error.response.data??error.message)
            console.log(error);            
        }
    }
  return (
    <div>
       
      <div className="max-w-md mx-auto my-8 py-10 px-6 bg-white shadow-lg rounded-lg">
      <h1 className="font-bold text-2xl text-center text-gray-800">Đăng ký tài khoản</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
        <div>
          <input
            type="text"
            placeholder="Họ tên"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.name && <span className="text-red-600 text-sm">Tên không được để trống</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              pattern: /^\S+@+(\S+\.)+[a-zA-Z]{2,6}$/,
              required: true,
            })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.email && <span className="text-red-600 text-sm">Email không đúng định dạng</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Số điện thoại"
            {...register("phone", {
              pattern: /^(0+[0-9]{9}|\+84+[0-9]{9})$/,
            })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.phone && <span className="text-red-600 text-sm">Số điện thoại không đúng định dạng</span>}
        </div>
        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Mật khẩu"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <div>
          <input
            type="password"
            {...register("repassword", { validate: (value) => watch("password") === value })}
            placeholder="Nhập lại mật khẩu"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.repassword && <span className="text-red-600 text-sm">Mật khẩu không khớp</span>}
        </div>
        <div className="flex justify-between items-center text-sm">
          <a href="/login" className="text-green-700 hover:underline">Đăng nhập</a>
        </div>
        <button className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition duration-200">
          Đăng ký
        </button>
      </form>
    </div>
  
    </div>
  )
}

export default Register