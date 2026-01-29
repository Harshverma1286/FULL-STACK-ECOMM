import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopcontext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import Relatedproducts from '../Components/Relatedproducts';

function Product() {

  const {productId} = useParams();

  const {products,currency,addtocart} = useContext(shopcontext);

  const [productdata,setproductdata] = useState(false);
  const [image,setimage] = useState('');
  const [size,setsize] = useState('');

  const fetchproductdata = async()=>{
    products.map((item)=>{
      if(item._id==productId){
        setproductdata(item);
        setimage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchproductdata();
  },[productId])


  return productdata ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productdata.image.map((item,index)=>(
                <img onClick={()=> setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>

          {/* product info */}

          <div className='flex-1 '>
            <h1 className='font-medium text-2xl mt-2'>
              {productdata.name}
            </h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt='' className='w-3 5' />
              <img src={assets.star_icon} alt='' className='w-3 5' />
              <img src={assets.star_icon} alt='' className='w-3 5' />
              <img src={assets.star_icon} alt='' className='w-3 5' />
              <img src={assets.star_dull_icon} alt='' className='w-3 5' />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productdata.sizes.map((item,index)=>(
                  <button onClick={()=>setsize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-range-500' : ''}`} key={index}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={()=> addtocart(productdata._id,size)  }  className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            <hr className='mt-8  sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% original product</p>
              <p>cash on delivery is available on this product</p>
              <p>Easy return and exchnage policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>


      {/* description and reviw section */}

      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit mollitia exercitationem voluptatum illo est at impedit minus reiciendis, eius quisquam eveniet nulla saepe hic libero possimus officiis quasi molestias incidunt.lorem10 Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, neque!</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem perspiciatis sunt mollitia cupiditate, dolores incidunt! Beatae ad cumque expedita iure.</p>
        </div>
      </div>

      <Relatedproducts category={productdata.category} subCategory={productdata.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
