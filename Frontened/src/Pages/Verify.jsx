import React from 'react'
import { useContext } from 'react';
import { shopcontext } from '../Context/ShopContext';
import backendurl from '../Context/ShopContext';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'

function Verify() {

    const {navigate,setcartitems,token} = useContext(shopcontext);

    const [searchparams,setsearchparams] = useSearchParams();

    const success = searchparams.get('success');
    const orderId = searchparams.get('orderId');



    const verifypayment = async()=>{
        try {
            if(!token){
                return null;
            }

            const response = await axios.post(backendurl+'/api/v1/orders/verifystripe',{success,orderId},{headers:{token}});

            if(response.data.success){
                setcartitems({});
                navigate('/orders');
            }
            else{
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        verifypayment();
    },[token]);

  return (
    <div>
      
    </div>
  )
}

export default Verify;
