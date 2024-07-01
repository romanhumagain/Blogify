import React, { useState, useEffect } from 'react';
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineLightMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoDesktop } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mode, setMode] = useState(()=>localStorage.getItem('mode')?localStorage.getItem('mode'):"system")

  const {user, logoutUser} = useAuth()
  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const element = document.documentElement

  useEffect(()=>{
    switch (mode) {
      case 'dark':
        element.classList.add('dark')
        localStorage.setItem('mode', "dark")
        break;
      case 'light':
        element.classList.remove('dark')
        localStorage.setItem('mode', "light")
        break;

      default:
        localStorage.removeItem("mode")
        break;
    }
  },[mode])


  return (
    <header className="bg-slate-200 shadow-lg dark:bg-neutral-700 dark:text-white duration-500">
      <nav className="flex items-center justify-between p-5 mx-auto w-[95%]">
        <div>
          <h1 className="font-bold text-2xl duration-150">Blogify</h1>
        </div>

        <div className={`bg-slate-200 menu_lists absolute md:static md:min-h-fit min-h-[60vh] left-0 ${isMenuOpen ? 'top-[9%]' : 'top-[-100%]'} md:w-auto w-full flex items-center px-5 duration-500 dark:bg-neutral-700 dark:text-white`}>
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[6vh] font-semibold text-lg text-gray-600 gap-10 mt-5 md:mt-0 dark:text-slate-100">
            <li><Link to="/" className=''>Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog-post">Post Blog</Link></li>
          </ul>
        </div>

        <ul className="font-semibold text-lg flex items-center gap-5">
          <div className='flex items-center gap-3 text-gray-700 bg-slate-200 dark:text-white shadow-lg rounded-lg p-2 text-2xl dark:bg-neutral-600 '>
          <MdSunny className={`${mode==="light" && 'text-sky-400'} cursor-pointer` } onClick={()=>{setMode('light')}} />
          <MdDarkMode className={`${mode==="dark" && 'text-sky-400'} cursor-pointer`} onClick={()=>{setMode('dark')}} />
          <IoDesktop className={`${mode==="system" && 'text-sky-400'} text-xl cursor-pointer`} onClick={()=>{setMode('system')}}/>
          </div>
          
          {user?(<li onClick={logoutUser} className='cursor-pointer'>Logout</li>):(<li><Link to="/login">Login</Link></li>)}
          
          <RiMenu3Fill className={`menu md:hidden text-2xl ${isMenuOpen ? 'hidden' : 'block'}`} onClick={handleToggle} />
          <RxCross2 className={`cross md:hidden text-2xl ${isMenuOpen ? 'block' : 'hidden'}`} onClick={handleToggle} />

        </ul>
      </nav>
    </header>
  );
};

export default Nav;
