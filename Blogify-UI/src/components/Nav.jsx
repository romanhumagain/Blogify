import React, { useState, useEffect } from 'react';
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineLightMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoDesktop } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogifyLogo from './BlogifyLogo';
import { useLocation } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mode, setMode] = useState(() => localStorage.getItem('mode') ? localStorage.getItem('mode') : "light")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [mode, setMode] = useState("light")

  const { user, logoutUser } = useAuth()
  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const location = useLocation()
  const pathname = location.pathname

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const isActive = (path) => {
    console.log(pathname?.split('/').pop() === path)
    return pathname?.split('/').pop() === path
  }


  const element = document.documentElement

  useEffect(() => {
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
  }, [mode])

  const handleLogout = () => {
    logoutUser()
    setIsDropdownOpen(false)
  }

  const handleMode = (e) => {
    if (mode === "light") {
      setMode("dark")
    }
    else {
      setMode("light")
    }

  }


  return (
    <header className="bg-slate-100 shadow-md dark:bg-neutral-800 dark:text-white border-b-0 border-gray-400 border-opacity-50 duration-500">
      <nav className="flex items-center justify-between p-3 mx-auto w-[95%]">
        <div>
          <BlogifyLogo />
        </div>

        <div className={`bg-slate-100 menu_lists absolute md:static md:min-h-fit min-h-[60vh] left-0 ${isMenuOpen ? 'top-[9%]' : 'top-[-100%]'} md:w-auto w-full flex items-center px-5 duration-500 dark:bg-neutral-800 dark:text-white`}>
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[6vh] font-semibold text-lg text-gray-600 gap-10 mt-5 md:mt-0 dark:text-slate-100">
            <li><Link to="/" className={`text-lg font-mono hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-500 ${isActive('') && 'text-teal-600 dark:text-teal-500'}`}>Home</Link></li>
            <li><Link to="/contact" className={`text-lg font-mono hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-500 ${isActive('contact') && 'text-teal-600 dark:text-teal-500'}`}>Contact</Link></li>
            {user && (
              <>
                <li><Link to="/notification" className={`text-lg font-mono hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-500 ${isActive('notification') && 'text-teal-600 dark:text-teal-500'}`}>Notification</Link></li>
                <li><Link to="/blog-post" className={`text-lg font-mono hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-500 ${isActive('blog-post') && 'text-teal-600 dark:text-teal-500'}`}>Post Blog</Link></li>
              </>)}

          </ul>
        </div>

        <ul className="font-semibold text-lg flex items-center gap-5">
          {user ? (
            <div className='flex items-center'>
              <FaUserCircle className='text-3xl cursor-pointer hover:scale-110 duration-300' onClick={toggleDropdown} />

              <div
                id="dropdownInformation"
                className={`z-10 ${isDropdownOpen ? '' : 'hidden'} absolute right-2 top-16 bg-gray-100 divide-y divide-gray-200 rounded-lg shadow w-44 dark:bg-neutral-600 dark:divide-gray-500 transition-all duration-700`}
                onMouseLeave={()=>setIsDropdownOpen(false)}>
                <div className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white">
                  <div>{user.name}</div>
                  <div className="font-normal truncate text-gray-500 dark:text-gray-300">{user.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                  <li>
                    <div className='flex items-center gap-1 text-gray-700 bg-gray-100 dark:text-white p-2 px-3 text-2xl dark:bg-neutral-600 dark:hover:bg-neutral-500 '>
                      <label className="inline-flex items-center me-2 cursor-pointer">
                        <input type="checkbox" className="sr-only peer" onChange={handleMode} />
                        <div className="relative w-11 h-6 bg-gray-700 rounded-full peer dark:bg-gray-300 peer-focus:ring-2 peer-focus:ring-teal-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300 dark:bg-gray"></div>
                        <span className="ms-1 text-sm font-medium text-gray-800 dark:text-gray-200">{mode === 'dark' ? <MdSunny className='text-2xl' /> : <MdDarkMode className=' text-2xl' />}</span>
                      </label>
                    </div>
                  </li>
                  <li className=''>
                    <Link to="#" className=" flex items-center gap-[5px] px-4 py-2 hover:bg-gray-200 dark:hover:bg-neutral-500 dark:hover:text-white"><FaUser />Profile</Link>
                  </li>
                  <li>
                    <Link to="#" className="flex items-center gap-[2px] px-4 py-2 hover:bg-gray-200 dark:hover:bg-neutral-500 dark:hover:text-white"><IoMdSettings className='text-lg' />Settings</Link>
                  </li>
                </ul>
                <div className="py-2">
                  <p className="flex items-center gap-[2px] px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-neutral-500 dark:text-gray-200 dark:hover:text-white cursor-pointer" onClick={handleLogout}><IoLogOut className='text-lg' />Sign out</p>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-5'>
              <div className='flex items-center gap-2 text-gray-700 bg-slate-200 dark:text-white shadow-lg rounded-lg p-2 text-2xl dark:bg-neutral-600 '>
                <label className="inline-flex items-center me-3 cursor-pointer">
                  <input type="checkbox" className="sr-only peer" onChange={handleMode} />
                  <div className="relative w-11 h-6 bg-gray-700 rounded-full peer dark:bg-gray-300 peer-focus:ring-2 peer-focus:ring-teal-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300 dark:bg-gray"></div>
                  <span className="ms-1 text-sm font-medium text-gray-800 dark:text-gray-200">{mode === 'dark' ? <MdSunny className='text-2xl' /> : <MdDarkMode className=' text-2xl' />}</span>
                </label>


              </div>
              <li className={`text-lg font-mono hover:text-teal-600 dark:hover:text-teal-500  ${isActive('login') && 'text-teal-600 dark:text-teal-500'}`}><Link to="/login">Login</Link></li>
            </div>
          )}

          <RiMenu3Fill className={`menu md:hidden text-2xl ${isMenuOpen ? 'hidden' : 'block'}`} onClick={handleToggle} />
          <RxCross2 className={`cross md:hidden text-2xl ${isMenuOpen ? 'block' : 'hidden'}`} onClick={handleToggle} />

        </ul>
      </nav>
    </header>
  );
};

export default Nav;
