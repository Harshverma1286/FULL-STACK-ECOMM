import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

import axios from 'axios'
import  currency  from '../App';
import {toast} from 'react-toastify'
import { assets } from '../assets/assets.js';
function Order({token}) {

  const backendurl = import.meta.env.VITE_BACKEND_URL;


  const [orders,setorders] = useState([]);

  const fetchallorders = async()=>{
    if(!token){
      return null;
    }

    try {
      const response = await axios.post(`${backendurl}/api/v1/orders/list`,{},{headers:{token}});

      if(response.data.success){
        setorders(response.data.orders.reverse());
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const statushandler = async(event,orderId)=>{
    try {
      const response = await axios.post(`${backendurl}/api/v1/orders/status`,{orderId,status:event.target.value}, {headers:{token}});

      if(response.data.success){
        await fetchallorders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  }

  useEffect(()=>{
    fetchallorders();
  },[token]);
  return (
    <div>
      <h3>Order page</h3>
      <div>
        {
          orders.map((order,index)=>{
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                  }
                  else{
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " "+order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}"</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
              <p className='mt-3'>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'} </p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>
            <select onChange={(e)=> statushandler(e,order._id)} value={order.status} className='p-2 font-semibold'>
              <option value="Order placed">Order placed</option>
              <option value="Packing">Packing</option>
              <option value="shipped">shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Order
