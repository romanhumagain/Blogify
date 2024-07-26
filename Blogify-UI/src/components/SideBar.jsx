import React, { useState, useEffect } from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegMessage } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiNotePencilDuotone } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiMailSendLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineArchive } from "react-icons/md";


import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
import BlogifyLogo from './BlogifyLogo'

const SideBar = () => {

  const location = useLocation()
  const pathname = location.pathname

  const isActive = (path) => {
    return pathname?.split('/').pop() === path.split('/').pop()
  }


  const menus = [
    { name: 'Dashboard', link: '/', icon: MdOutlineDashboard },
    { name: 'Search', link: '/search', icon: FiSearch },
    { name: 'Message', link: '/message', icon: FaRegMessage },
    { name: 'Notification', link: '/notification', icon: IoNotificationsOutline },
    { name: 'Contact', link: '/contact', icon: RiMailSendLine },
    { name: 'Post Blog', link: '/blog-post', icon: PiNotePencilDuotone, margin: false },
  ];
  const [mode, setMode] = useState(() => localStorage.getItem('mode') ? localStorage.getItem('mode') : "light")
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { logoutUser } = useAuth()

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
  const handleMode = (e) => {
    if (mode === "light") {
      setMode("dark")
    }
    else {
      setMode("light")
    }
  }

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark")
    }
    else {
      setMode("light")
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to sign out?",
      text: "You will be redirect to the login page !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: "Yes, Sign Out"
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
      }
    });
    setIsDropdownOpen(false)
  }


  return (
    <>
      <div className={`bg-slate-50 dark:bg-neutral-900 h-full ${isSideBarOpen ? 'w-52 md:w-72' : 'w-[80px]'}  duration-500 fixed border-r border-opacity-50 border-gray-400 dark:border-gray-400`} style={{ fontFamily: "Nunito Sans", fontWeight: '600' }}>

        <div className='text-gray-800 py-3 flex justify-between mx-6 items-center dark:text-gray-200'>

          <div className={`${!isSideBarOpen && 'hidden opacity-0 translate-x-28 overflow-hidden '}`}>
            <BlogifyLogo />
          </div>



          <HiMenuAlt3 className={`text-3xl cursor-pointer ${!isSideBarOpen && 'rotate-180'}`} onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
        </div>

        <Link to={'/profile'}>
          <div className={`grid grid-cols-12 mx-5 bg-gray-200 rounded-lg dark:bg-neutral-800 p-1 mt-3 ${!isSideBarOpen && ' hidden '} transition-transform hover:scale-105 duration-700`}>
            <div className='col-span-3 overflow-hidden p-1'>
              <img src='.\src\assets\pp.jpg' className='object-cover h-11 w-11 rounded-full'></img>
            </div>
            <div className='col-span-9 p-1'>
              <p className='text-sm font-semibold text-gray-900 dark:text-gray-300 '>Roman Humagain</p>
              <p className='text-sm text-gray-500 dark:text-gray-400 truncate'>romanhumagain@gmail.com</p>
            </div>
          </div>
        </Link>

        <div className='text-gray-900  mt-8 flex flex-col gap-3 md:gap-4 lg:gap-5  dark:text-gray-200 text-[14px] md:text-[16px] lg:text-[18px] '>
          {menus.map((menu, i) => (
            <div key={menu.name}>
              <Link to={menu.link}>
                <div key={menu.name} className={`${menu?.margin && 'mt-3'} flex gap-3  items-center mx-6  hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-lg p-[6px] px-2 ${isActive(menu.link) && 'bg-gray-200 dark:bg-neutral-800'}`}>
                  <div>
                    {React.createElement(menu.icon)}
                  </div>
                  <div className={`whitespace-pre duration-300 ${!isSideBarOpen && (

                    'opacity-0 translate-x-28 overflow-hidden '
                  )}`}  >{menu.name}</div>
                </div>
              </Link>
            </div>
          ))}


          <div className={`flex gap-3 items-center mx-6 mb-[1px] hover:bg-gray-200 dark:hover:bg-neutral-800 hover:rounded-lg p-1 cursor-pointer`}
            onClick={toggleDropdown}>
            <div>
              <HiOutlineMenuAlt2 />
            </div>
            <p><div className={`whitespace-pre duration-300 ${!isSideBarOpen && (

              'opacity-0 translate-x-28 overflow-hidden '
            )}`} >More</div></p>
          </div>

          <div
            id="dropdownInformation"
            className={`z-10 ${isDropdownOpen ? '' : 'hidden'} absolute left-2 bottom-40 overflow-hidden bg-gray-200  divide-gray-200 rounded-lg shadow w-44 dark:bg-neutral-800 dark:divide-gray-500 transition-all duration-700 py-5`}
            onMouseLeave={() => setIsDropdownOpen(false)}>

            <Link to={"/archive-post-details"}>
              <div className={`flex gap-3 items-center mx-4 mb-3 hover:bg-gray-300 dark:hover:bg-neutral-700 hover:rounded-lg p-1`}>
                <div>
                  <MdOutlineArchive />
                </div>
                <p><div className={`whitespace-pre duration-300 `} >Archived</div></p>
              </div>
            </Link>


            <Link to={"/saved-post-details"}>
              <div className={`flex gap-3 items-center mx-4 mb-3 hover:bg-gray-300 dark:hover:bg-neutral-700 hover:rounded-lg p-1`}>
                <div>
                  <FaRegHeart />
                </div>
                <p><div className={`whitespace-pre duration-300 `} >Saved</div></p>
              </div>
            </Link>

            <Link to={"/"}>
              <div className={`flex gap-3 items-center mx-4 mb-3 hover:bg-gray-300 dark:hover:bg-neutral-700 hover:rounded-lg p-1`}>
                <div>
                  <IoSettingsOutline />
                </div>
                <p><div className={`whitespace-pre duration-300`} >Settings</div></p>
              </div>
            </Link>

            <div className={`flex gap-3 items-center mx-4 mb-3 hover:bg-gray-300 dark:hover:bg-neutral-700 hover:rounded-lg p-1 cursor-pointer`}>
              <div>
                <IoLogOut />
              </div>
              <p onClick={handleLogout}><div className={`whitespace-pre duration-300 `} >Sign out</div></p>
            </div>
          </div>

          <div className='mx-6 p-1 mt-3 overflow-hidden '>
            {isSideBarOpen ? (
              <label className="inline-flex items-center me-3 cursor-pointer">
                <input type="checkbox" className="sr-only peer" onChange={handleMode} />
                <div className="relative w-11 h-6 bg-neutral-700 rounded-full peer dark:bg-gray-300 peer-focus:ring-2 peer-focus:ring-teal-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300 dark:bg-gray"></div>
                <span className="ms-1 text-sm font-medium text-gray-800 dark:text-gray-200">{mode === 'dark' ? <MdSunny className='text-2xl' /> : <MdDarkMode className=' text-2xl' />}</span>
              </label>
            ) : (
              <p className=" text-sm font-medium text-neutral-800 dark:text-gray-200 cursor-pointer" onClick={toggleMode}>{mode === 'dark' ? <MdSunny className='text-2xl' /> : <MdDarkMode className=' text-2xl' />}</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default SideBar;
