import React, { useContext, useState } from 'react'
import Title from '../Components/Title';
import Carttotal from '../Components/Carttotal';
import { assets } from '../assets/assets';
import { shopcontext } from '../Context/ShopContext';
import { toast } from 'react-toastify';

function PlaceOrder() {

  const [method,setmethod] = useState('COD');

  const [formdata,setformdata] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onchangehandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;

    setformdata(data=> ({...data,[name]:value}));
  }

  const initpay = (order)=>{
    const options ={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:"Order payment",
      description:'Order payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async ()=>{
        console.log(response);
        try {
          const {data} = await axios.post(backendUrl+'/api/v1/orders/verifyrazorpay',response,{headers:{token}});

          if(data.success){
            navigate('orders');
            setcartitems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }
  const {navigate,backendUrl,token,cartitems,setcartitems,getcartamount,delivery_fee,products} = useContext(shopcontext);

  const onsubmithandler = async(e)=>{
    e.preventDefault();

    try {
      
      let orderitems = [];

      for(const items in cartitems){
        for(const item in cartitems[items]){
          if(cartitems[items][item]>0){
            const iteminfo = structuredClone(products.find(products=> products._id===items));

            if(iteminfo){
              iteminfo.size = item;
              iteminfo.quantity = cartitems[items][item];
              orderitems.push(iteminfo);
            }
          }
        }
      }

      let orderdata = {
        address:formdata,
        items:orderitems,
        amount:getcartamount()+delivery_fee,

      }

      switch(method){
        case 'cod':
          const response = await axios.post(backendUrl+'/api/v1/orders/place',orderdata,{headers:{token}});

          if(response.data.success){
            setcartitems({});
            navigate('/orders');
          }

          else{
            toast.error(response.data.message);
          }
          break;

          case 'stripe':
            const responsestripe = await axios.post(backendUrl+'/api/v1/orders/stripe',orderdata,{headers:{token}});

            if(responsestripe.data.success){
              const {session_url} = responsestripe.data;

              window.location.replace(session_url);
            }
            else{
              toast.error(responsestripe.data.message);
            }
            break;

            case 'razorpay':
              const  responserazorpay = await axios.post(backendUrl+'/api/v1/orders/razorpay',orderdata,{headers:{token}});

              if(responserazorpay.data.success){
                initpay(responserazorpay.data.order)
              }

              break;

          default:
            break;
      }

      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }


  return (
    <form onSubmit={onsubmithandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* left side */}
    <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'}  text2={'INFORMATION'}/>
        </div>

        <div className='flex gap-3'>
          <input required onChange={onchangehandler} name='FirstName' value={formdata.firstName} type="text" placeholder='first name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onchangehandler} name='lastName' value={formdata.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onchangehandler} 
        name='email' value={formdata.email} type="text" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onchangehandler}
        name='street' value={formdata.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input required onChange={onchangehandler}
          name='city' value={formdata.city} type="text" placeholder='city' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onchangehandler}
          name='state' value={formdata.state} type="text" placeholder='state' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onchangehandler}
          name='zipcode' value={formdata.zipcode} type="number" placeholder='zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onchangehandler}
          name='country' value={formdata.country} type="text" placeholder='country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onchangehandler}
        name='phone' value={formdata.phone} type="number" placeholder='phone number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* right side */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <Carttotal/>
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>

          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=> setmethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
              <div onClick={()=> setmethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p  className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay' ? 'bg-green-400' : ''}`}></p>
                <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
              <div onClick={()=> setmethod('COD')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='COD' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'> CASH ON DELIVERY</p>
            </div>
          </div>

           <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
           </div>
        </div>

      </div>
      
    </form>
  )
}

export default PlaceOrder;
