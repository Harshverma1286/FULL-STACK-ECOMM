import React, { useContext } from 'react'
import { shopcontext } from '../Context/ShopContext'
import { Link } from 'react-router-dom';

function Cardscollection({id,image,name,price}) {
    const {currency} = useContext(shopcontext);
  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        </div>
        <p className='t-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default Cardscollection
