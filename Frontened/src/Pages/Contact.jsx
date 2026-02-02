import React from 'react'
import Title from '../Components/Title';
import assets from '../assets/assets';

import NewsLettersBox from '../Components/NewsLettersBox';

function Contact() {
  return (
  <div>   
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center item-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our store</p>
          <p className='text-gray-500'>789790 path way <br /> suite 380, Washington, USA</p>
          <p className='text-gray-500'>Tel: (415) 555-0132 <br /> Email: harsh@work.com</p>
          <p className='font semibold text-xl text-gray-600'>Lorem, ipsum dolor.</p>
          <p className='text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, fugit!</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>

       <NewsLettersBox/>
    </div>
  )
}

export default Contact
