import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopcontext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import Relatedproducts from '../Components/Relatedproducts'

function Product() {
  const { productId } = useParams()
  const { products, currency, addtocart } = useContext(shopcontext)

  const [productdata, setproductdata] = useState(null)
  const [image, setimage] = useState('')
  const [size, setsize] = useState('')

  const fetchproductdata = () => {
    const found = products.find(item => item._id === productId)
    if (found) {
      setproductdata(found)
      setimage(Array.isArray(found.image) ? found.image[0] : found.image)
    }
  }

  useEffect(() => {
    fetchproductdata()
  }, [productId, products])

  return productdata ? (
    <div className="container mx-auto border-t pt-10 px-4">

      {/* PRODUCT SECTION */}
      <div className="flex flex-col sm:flex-row gap-10">

        {/* IMAGE GALLERY */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-6">

          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24">
            {productdata.image.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setimage(img)}
                className="w-20 h-20 object-cover rounded cursor-pointer border hover:border-black transition"
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-lg p-4">
            <img
              src={image}
              className="max-h-[500px] w-auto object-contain"
              alt=""
            />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{productdata.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 h-3" />
            <img src={assets.star_icon} className="w-3 h-3" />
            <img src={assets.star_icon} className="w-3 h-3" />
            <img src={assets.star_icon} className="w-3 h-3" />
            <img src={assets.star_dull_icon} className="w-3 h-3" />
            <p className="pl-2 text-sm">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}{productdata.price}
          </p>

          <p className="mt-5 text-gray-500">
            {productdata.description}
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productdata.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setsize(item)}
                  className={`border px-4 py-2 bg-gray-100 ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addtocart(productdata._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="my-8" />

          <div className="text-sm text-gray-500 flex flex-col gap-1">
            <p>100% original product</p>
            <p>Cash on delivery available</p>
            <p>Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="border px-6 py-6 text-sm text-gray-500 space-y-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit mollitia
            exercitationem voluptatum illo est at impedit minus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            perspiciatis sunt mollitia cupiditate.
          </p>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <Relatedproducts
        category={productdata.category}
        subCategory={productdata.subCategory}
      />
    </div>
  ) : null
}

export default Product;