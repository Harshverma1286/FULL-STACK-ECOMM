import React, { useContext, useEffect, useState } from 'react'
import { shopcontext } from '../Context/ShopContext'
import Title from './Title';
import Cardscollection from './Cardscollection';

function BestSeller() {

    const {products} = useContext(shopcontext);

    const [bestseller,setbestseller] = useState([]);

    useEffect(()=>{
        const bestproducts = products.filter((value)=> value.bestseller===true);

        setbestseller(bestproducts.slice(0,5));
    },[])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, doloribus.
            </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestseller.map((item,index)=>{
                    <Cardscollection key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                })
            }
        </div>
      
    </div>
  )
}

export default BestSeller
