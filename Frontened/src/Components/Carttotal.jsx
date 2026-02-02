import React, { useContext } from 'react'
import { shopcontext } from '../Context/ShopContext'
import Title from '../Components/Title';

function Carttotal() {

    const {currency,delivery_fee,getcartamount} = useContext(shopcontext);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-betweeen'>
            <p>subtotal</p>
            <p>{currency}{getcartamount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>shipping Fee</p>
            <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr/>
        <div className='flex justify-between'>
            <p>Total</p>
            <p>{currency}{getcartamount()===0 ? 0 : getcartamount()+delivery_fee}.00</p>
        </div>
        <hr/>
      </div>
    </div>
  )
}

export default Carttotal
