import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IProduct } from '../interface/product'
import { IOrder } from '../interface/orders'

type Props = {}

const OrderList = (props: Props) => {
    const [orders,setOrder]= useState<IOrder[]>([])
    useEffect(()=>{
        const get_orders = async ()=>{
          const {data} = await axios.get(`http://localhost:3000/orders`)
          setOrder(data)
        }
        get_orders() 
    },[])
    const DoanhThu = (orders:IOrder[]):number=>{
        const tong = orders.reduce((value:number,item:IOrder)=>value+(item.price*item.quantity),0)        
        return tong
    }
    return (
      <>
        <h1>Danh sách đơn hàng</h1>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>số lượng</th>
              <th>Giá tiền</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((item,index)=>
              (
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.price*item.quantity}</td>
                </tr>
              )
              )
            }
        </tbody>
        </table>
        Doanh thu: {DoanhThu(orders)}
      </>
    )
}

export default OrderList