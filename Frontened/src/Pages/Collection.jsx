import React, { useContext, useEffect, useState } from 'react'
import { shopcontext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import {Title} from '../Components/Title';

import {CardsCollection} from '../Components/Cardscollection';

function Collection() {
  const {products} = useContext(shopcontext);

  const [visible,setvisible] = useState(false);

  const [filterproducts,setfilterproducts] = useState([]);

  const [category,setCategory] = useState([]);
  const [subcategory,setSubcategory] = useState([]);

  const [sorttype,setsorttype] = useState('relevant');


  const togglecategory = (e)=>{

    const findingvalue = category.find((val)=> e.target.value===val);

    if(findingvalue){
      setCategory(prev=> prev.filter(item=> item!==e.target.value));
    }
    else{
      setCategory(prev=>[...prev,e.target.value]);
    }
  }

  const togglesubcategory = (e)=>{
    const findvalue = subcategory.find((val)=> e.target.value===val);

    if(findvalue){
      setSubcategory(prev=> prev.filter(item=> item!==e.target.value));
    }
    else{
      setSubcategory([...prev,e.target.value]);
    }
  }

  const applyfilter = (e)=>{
    let productcopy = products.slice(0,10);

    if(category.length>0){
      productcopy = productcopy.filter((item)=> category.includes(item.category))
    } 

    if(subcategory.length>0){
      productcopy = productcopy.filter((item) => subcategory.includes(item.subCategory))
    }

    setfilterproducts(productcopy);
  }

  const sortproduct = ()=>{
    let fpproduct = filterproducts.slice();

    switch (sorttype){
      case 'low-high':
        setfilterproducts(fpproduct.sort((a,b)=>(a.price-b.price)));
        break;

      case 'high-low':
        setfilterproducts(fpproduct.sort((a,b)=> (b.price-a.price)));  
        break;

      default:
        applyfilter();
        break;
    }
  }

  useEffect(()=>{
    applyfilter();
  },[category,subcategory]);

  useEffect(()=>{
    sortproduct();
  },[sorttype])


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
              <input className='w-3' type="checkbox" value={'Men'} onChange={togglecategory} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'women'} onChange={togglecategory} />women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={togglecategory} />Kids
            </p>
          </div>
        </div>
        {/* subcategory */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${visible ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'TOPWEAR'} onChange={togglesubcategory} />TOPWEAR
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'BOTTOMWEAR'} onChange={togglesubcategory} />BOOTOMWEAR
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'WINTERWEAR'} onChange={togglesubcategory} />WINTERWEAR
            </p>
          </div>
        </div>
      </div>


      {/* right side */}
      <div className='flex-1'>

       <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'ALL'} text2={'COLLECTIONS'}/>

        {/* product sort */}

        <select onChange={(e)=> setsorttype(e.target.value)} className='border-2 border-gray-300 text-sm px-2 '>
          <option value="relavent">sort by: Relevant</option>
          <option value="low-high">sort by: Low to High</option>
          <option value="high-low">sort by: High to Low</option>
        </select>
        </div> 
      </div>

      {/* Map products */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {filterproducts.map((index,value)=>(
          <CardsCollection key={index} name={value.name} id={value._id} price={value.price} image={value.image}/>
        ))}
      </div>
    </div>
  )
}

export default Collection
