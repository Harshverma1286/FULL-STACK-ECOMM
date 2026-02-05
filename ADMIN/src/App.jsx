import { useState } from 'react'
import Navbar from './Components/Navbar'
import './App.css'
import Sidebar from './Components/Sidebar'
import {Routes,Route} from 'react-router-dom';
import Add from '../src/Pages/Add';
import List from '../src/Pages/List';
import Order from '../src/Pages/Order';
import Login from './Components/Login';

 import { ToastContainer, toast } from 'react-toastify';


export const backendurl = import.meta.env.VITE_BACKEND_URL;

export const currency = '$';

function App() {
  const [token,settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');


  useEffect(()=>{
      localStorage.setItem('token',token);
  },[token]);



  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token ==="" ? <Login settoken={settoken}/> : 
      <>
      <Navbar settoken={settoken}/>
      <hr/>
      <div className='flex w-full'>
        <Sidebar/>
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
          <Routes>
            <Route path='/add' element={<Add token={token}/>}/>
            <Route path='/List' element={<List token={token}/>}/>
            <Route path='/order' element={<Order token={token}/>}/>
          </Routes>
        </div>
      </div>
      </>}
    </div>
  )
}

export default App;
