import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { toast } from 'react-toastify';

function Login({settoken}) {

    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');

    const backendurl = import.meta.env.VITE_BACKEND_URL;

    const onsubmithandler = async(e)=>{
        try {
            e.preventDefault();
            console.log(backendurl);
            const response = await axios.post(`${backendurl}/api/v1/users/admin`,{email,password}); 
            // axios helps us to send http request at backened

            if(response.data.success){
                console.log(response.data.success);
                settoken(response.data.token)
            }
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("here is the error");
            console.log(error);
            toast.error(error.message);
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onsubmithandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input onChange={(e)=> setemail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Your@gmail.com' required />
            </div>

            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input onChange={(e)=> setpassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
            </div>
            <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
