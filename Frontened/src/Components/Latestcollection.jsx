import React, { useContext, useEffect, useState } from 'react'
import { shopcontext } from '../Context/ShopContext'
import Title from './Title';
import Cardscollection from './Cardscollection';

function Latestcollection() {

    const {products} = useContext(shopcontext);

    const [allproducts,setallproducts] = useState([]);

    useEffect(()=>{
        setallproducts(products.slice(0,10));
    },[])


  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, officiis nihil distinctio iusto reprehenderit aspernatur nam architecto perspiciatis veniam dolorum.</p>
      </div>
      {/* products */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {allproducts.map((value,index)=>{
            <Cardscollection key={index} id={value._id} image={value.image} name={value.name} price={value.price} />
        })}
      </div>


    </div>
  )
}

export default Latestcollection
