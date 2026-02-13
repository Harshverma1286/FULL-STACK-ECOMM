import React, { useContext, useEffect, useState } from 'react'
import { shopcontext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../Components/Title';

import CardsCollection from '../Components/Cardscollection';

function Collection() {
  const {products,search, showsearch} = useContext(shopcontext);

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
      setSubcategory(prev=>[...prev,e.target.value]);
    }
  }

  const applyfilter = (e)=>{
    let productcopy = products.slice(0,10);

    if(showsearch && search){
      productcopy = productcopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()));
    }

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
  },[category,subcategory,search,showsearch,products]);

  useEffect(()=>{
    sortproduct();
  },[sorttype])


 return (
  <div className="container mx-auto flex flex-col sm:flex-row gap-10 pt-10 border-t px-4">

    {/* Sidebar */}
    <div className="min-w-[250px]">

      <p
        onClick={() => setvisible(!visible)}
        className="my-2 text-xl flex items-center cursor-pointer gap-2"
      >
        FILTERS
        <img
          className={`h-3 sm:hidden ${visible ? "rotate-90" : ""}`}
          src={assets.dropdown_icon}
          alt=""
        />
      </p>

      {/* Category */}
      <div className={`border border-gray-300 p-4 mt-6 rounded-md ${visible ? "" : "hidden"} sm:block`}>
        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <label className="flex gap-2">
            <input type="checkbox" value="Men" onChange={togglecategory} />
            Men
          </label>
          <label className="flex gap-2">
            <input type="checkbox" value="Women" onChange={togglecategory} />
            Women
          </label>
          <label className="flex gap-2">
            <input type="checkbox" value="Kids" onChange={togglecategory} />
            Kids
          </label>
        </div>
      </div>

      {/* Type */}
      <div className={`border border-gray-300 p-4 mt-6 rounded-md ${visible ? "" : "hidden"} sm:block`}>
        <p className="mb-3 text-sm font-medium">TYPE</p>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <label className="flex gap-2">
            <input type="checkbox" value="TOPWEAR" onChange={togglesubcategory} />
            TOPWEAR
          </label>
          <label className="flex gap-2">
            <input type="checkbox" value="BOTTOMWEAR" onChange={togglesubcategory} />
            BOTTOMWEAR
          </label>
          <label className="flex gap-2">
            <input type="checkbox" value="WINTERWEAR" onChange={togglesubcategory} />
            WINTERWEAR
          </label>
        </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="flex-1 flex flex-col">

      {/* Header + Sort */}
      <div className="flex justify-between items-center mb-6">
        <Title text1="ALL" text2="COLLECTIONS" />

        <select
          onChange={(e) => setsorttype(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-sm rounded-md focus:outline-none"
        >
          <option value="relevant">Sort by: Relevant</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterproducts.map((item) => (
          <CardsCollection
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>

    </div>
  </div>
);
}

export default Collection
