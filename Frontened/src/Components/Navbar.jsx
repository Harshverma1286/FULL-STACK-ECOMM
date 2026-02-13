import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { shopcontext } from '../Context/ShopContext';

function Navbar() {

  const [visible, setvisible] = useState(false);

  const { 
    setshowserach,
    getcartcount,
    navigate,
    token,
    settoken,
    setcartitems
  } = useContext(shopcontext);


  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    settoken('');
    setcartitems({});
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium relative'>

      {/* Logo */}
      <Link to='/'>
        <img src={assets.Logo} className='w-36' alt='' />
      </Link>

      {/* Desktop Menu */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to='/' className="hover:text-black">
          <p>HOME</p>
        </NavLink>

        <NavLink to='/collection' className="hover:text-black">
          <p>COLLECTION</p>
        </NavLink>

        <NavLink to='/about' className="hover:text-black">
          <p>ABOUT</p>
        </NavLink>

        <NavLink to='/contact' className="hover:text-black">
          <p>CONTACT</p>
        </NavLink>

      </ul>

      {/* Right Section */}
      <div className='flex items-center gap-6'>

        {/* Search */}
        <img 
          onClick={() => setshowserach(true)} 
          src={assets.search_icon} 
          className='w-5 cursor-pointer' 
          alt="" 
        />

        {/* Profile */}
        <div className='relative group'>
          <img
            onClick={() => token ? null : navigate('/login')}
            src={assets.profile_icon}
            className='w-5 cursor-pointer'
            alt=""
          />

          {token && (
            <div className='absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-md py-3 text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
              <p className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                My Profile
              </p>

              <p
                onClick={() => navigate('/orders')}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              >
                Orders
              </p>

              <p
                onClick={logout}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getcartcount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setvisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt=""
        />

      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 z-50 ${visible ? 'w-full' : 'w-0 overflow-hidden'}`}>

        <div className='flex flex-col text-gray-600'>

          <div
            onClick={() => setvisible(false)}
            className='flex items-center gap-4 p-4 cursor-pointer border-b'
          >
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setvisible(false)} className='py-3 pl-6 border-b' to='/'>
            HOME
          </NavLink>

          <NavLink onClick={() => setvisible(false)} className='py-3 pl-6 border-b' to='/collection'>
            COLLECTION
          </NavLink>

          <NavLink onClick={() => setvisible(false)} className='py-3 pl-6 border-b' to='/about'>
            ABOUT
          </NavLink>

          <NavLink onClick={() => setvisible(false)} className='py-3 pl-6 border-b' to='/contact'>
            CONTACT
          </NavLink>

        </div>

      </div>

    </div>
  )
}

export default Navbar;
