import React from 'react'
import { IOrder } from '../interface/orders'
import { useForm } from 'react-hook-form'
import axios from 'axios'

type Props = {}

const OrderAdd = (props: Props) => {
    const {register,handleSubmit} = useForm<IOrder>()
    const onSubmit = async (data:IOrder)=>{
        try {
            await axios.post(`http://localhost:3000/orders`,data)
            alert("Thêm mới thành công")
        } catch (error) {
            
        }
    }
  return (
    <div>
        <h1>Thêm mới Order</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' {...register("name")} placeholder='tên'/>
            <input type='number' {...register("price")} placeholder='Giá'/>
            <input type='text' {...register("quantity")} placeholder='Số lượng'/>
            <button>Thêm</button>
        </form>
        </div>
  )
}

export default OrderAdd