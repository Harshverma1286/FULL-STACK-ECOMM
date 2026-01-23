import React, { useContext, useState } from 'react'
import { shopcontext } from '../Context/ShopContext'
import { assets } from '../assets/assets';

function Collection() {
  const {products} = useContext(shopcontext);

  const [visible,setvisible] = useState(false);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter options */}

      <div className='min-w-60'>
        <p onClick={()=> setvisible(!visible)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${visible ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* category */}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${visible ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'women'} />women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} />Kids
            </p>
          </div>
        </div>
        {/* subcategory */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${visible ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'TOPWEAR'} />TOPWEAR
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'BOTTOMWEAR'} />BOOTOMWEAR
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'WINTERWEAR'} />WINTERWEAR
            </p>
          </div>
        </div>
      </div>


      {/* right side */}
      
    </div>
  )
}

export default Collection
