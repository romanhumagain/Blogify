import React, { useState, useEffect } from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiMailSendLine } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineArchive } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BlogifyLogo from './BlogifyLogo'
import SearchModal from '../modal/SearchModal';
import NotificationModal from '../modal/NotificationModal';

import {
  RiHomeFill, RiHomeLine,
  RiSearchFill, RiSearchLine,
  RiMessage3Fill, RiMessage3Line,
  RiNotification3Fill, RiNotification3Line,
  RiContactsFill, RiContactsLine,
  RiArticleFill, RiArticleLine
} from 'react-icons/ri';

const SideBar = () => {
  const [mode, setMode] = useState(() => localStorage.getItem('mode') ? localStorage.getItem('mode') : "light")
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isNotificationModal, setIsNotificationModal] = useState(false)
  const { logoutUser, authenticatedUser } = useAuth()

  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()

  const navigatePage = (link) => {
    closeModal()
    navigate(link)
  };

  const navigateModal = (modal) => {
    setIsModalOpen(true)
    if (modal === "/search") {
      setIsSearchModalOpen(true)
      setIsNotificationModal(false)
    }
    else if (modal === "/notification") {
      setIsNotificationModal(true)
      setIsSearchModalOpen(false)

    }
  };

  const closeModal = () => {
    setIsModalOpen(false)
    if (isSearchModalOpen) {
      setIsSearchModalOpen(false)
    }
    if (isNotificationModal) {
      setIsNotificationModal(false)
    }
  }

  const menus = [
    { name: 'Home', link: '/', navFunc: navigatePage, activeIcon: RiHomeFill, inactiveIcon: RiHomeLine },
    { name: 'Search', link: '/search', navFunc: navigateModal, activeIcon: RiSearchFill, inactiveIcon: RiSearchLine },
    { name: 'Message', link: '/message', navFunc: navigatePage, activeIcon: RiMessage3Fill, inactiveIcon: RiMessage3Line },
    { name: 'Notification', link: '/notification', navFunc: navigateModal, activeIcon: RiNotification3Fill, inactiveIcon: RiNotification3Line },
    { name: 'Contact', link: '/contact', navFunc: navigatePage, activeIcon: RiContactsFill, inactiveIcon: RiContactsLine },
    { name: 'Post Blog', link: '/blog-post', navFunc: navigatePage, activeIcon: RiArticleFill, inactiveIcon: RiArticleLine },
  ];

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
      title: "Are you sure ?",
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
      <div className={`bg-slate-50 dark:bg-neutral-950 h-full ${isModalOpen ? 'w-[90px]' : (isSideBarOpen ? 'w-52 md:w-64 ' : 'w-[90px]')} duration-500 fixed border-r border-opacity-50 border-gray-400 dark:border-neutral-600`} style={{ fontFamily: "Nunito Sans", fontWeight: '600' }}>

        <div className='flex items-center justify-between py-3 mx-6 text-gray-800 dark:text-gray-200'>

          <div className={`${isModalOpen ? 'hidden opacity-0 translate-x-28 overflow-hidden':(!isSideBarOpen && 'hidden opacity-0 translate-x-28 overflow-hidden')}  ${!isSideBarOpen && ' '}`}>
            <BlogifyLogo />
          </div>

          <HiMenuAlt3
            className={`text-3xl cursor-pointer ${!isSideBarOpen && 'rotate-180'} ${isModalOpen ? 'pointer-events-none opacity-50' : ''}`}
            aria-disabled={isModalOpen}
            onClick={() => {
              if (!isModalOpen) {
                setIsSideBarOpen(!isSideBarOpen);
              }
            }}
          />
        </div>

        <Link to={`/profile/${authenticatedUser?.slug}`}>
          <div className={`grid grid-cols-12 bg-gray-200/80 rounded-lg dark:bg-neutral-800 mt-3 ${isSideBarOpen ? 'p-1 mx-3' : 'mx-4 py-1'} `}>
            {!isModalOpen && isSideBarOpen ? (
              <>
                <div className='col-span-3 p-1 overflow-hidden'>
                  <img src={`http://127.0.0.1:8000/${authenticatedUser?.profile_pic}`} className='object-cover rounded-full h-11 w-11'></img>
                </div>
                <div className='col-span-9 p-1'>
                  <p className='text-sm font-semibold text-gray-900 dark:text-gray-300 '>{authenticatedUser?.full_name}</p>
                  <p className='text-sm text-gray-500 truncate dark:text-gray-400'>{authenticatedUser?.email}</p>
                </div>
              </>
            ) : (
              <div className='col-span-12 mx-auto'>
                <img src='.\src\assets\pp.jpg' className='object-cover w-8 h-8 rounded-full'></img>
              </div>
            )}


          </div>
        </Link>

        <div className='text-gray-900  mt-8 flex flex-col gap-3 md:gap-4 lg:gap-5  dark:text-gray-200 text-[14px] md:text-[16px] lg:text-[18px] '>
          {menus.map((menu, i) => {
            const isActive = pathname === menu.link;
            const IconComponent = isActive ? menu.activeIcon : menu.inactiveIcon;
            return (
              <div key={menu.name} >
                <div key={menu.name} className={`${menu?.margin && 'mt-3'} flex gap-3  items-center mx-6  hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-lg p-[5px] px-2 duration-300 cursor-pointer`} onClick={() => menu.navFunc(menu.link)}>
                  <div className='text-2xl'>
                    {React.createElement(IconComponent)}
                  </div>
                  <div className={`whitespace-pre duration-300
                   ${isModalOpen ? 'opacity-0 translate-x-28 overflow-hidden ' : (!isSideBarOpen && (

                    'opacity-0 translate-x-28 overflow-hidden '
                  ))}`}  >{menu.name}</div>
                </div>
              </div>
            )

          })}


          <div className={`flex gap-3 items-center mx-8 mb-[1px] hover:bg-gray-200 dark:hover:bg-neutral-800 hover:rounded-lg p-1 cursor-pointer`}
            onClick={toggleDropdown}>
            <div>
              <HiOutlineMenuAlt2 />
            </div>
            <p><div className={`whitespace-pre duration-300 ${isModalOpen ? 'opacity-0 translate-x-28 overflow-hidden ' : (!isSideBarOpen && (

                    'opacity-0 translate-x-28 overflow-hidden '
                  ))}`} >More</div></p>
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

          <div className='p-1 mt-3 overflow-hidden mx-7 '>
            {!isModalOpen && isSideBarOpen ? (
              <label className="inline-flex items-center cursor-pointer me-3">
                <input type="checkbox" className="sr-only peer" onChange={handleMode} />
                <div className="relative w-11 h-6 bg-neutral-700 rounded-full peer dark:bg-gray-300 peer-focus:ring-2 peer-focus:ring-teal-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300 dark:bg-gray"></div>
                <span className="text-sm font-medium text-gray-800 ms-1 dark:text-gray-200">{mode === 'dark' ? <MdSunny className='text-2xl' /> : <MdDarkMode className='text-2xl ' />}</span>
              </label>
            ) : (
              <p className="text-sm font-medium cursor-pointer text-neutral-800 dark:text-gray-200" onClick={toggleMode}>{mode === 'dark' ? <MdSunny className='text-2xl' /> : <MdDarkMode className='text-2xl ' />}</p>
            )}
          </div>

        </div>
      </div>

      {isSearchModalOpen &&
        <SearchModal isOpen={isSearchModalOpen} closeModal={closeModal} />
      }

      {isNotificationModal &&
        <NotificationModal isOpen={isNotificationModal} closeModal={closeModal} />
      }
    </>
  );
};

export default SideBar;
