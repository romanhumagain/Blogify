import React from 'react'
import { useBlog } from '../context/BlogContext'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const PopularSection = () => {
  const { blogCategory } = useBlog()

  return (
    <>
      <div className='h-screen rounded-sm bg-slate-50 dark:bg-neutral-950' style={{ fontFamily: "Nunito Sans" }}>

        <div className='flex flex-col gap-1 p-3 mb-3'>
          <div>
            <p className='text-gray-700 dark:text-gray-300 text-xl lg:text-[22px] font-bold mt-6 mb-4'>People you may know</p>

            <div className='grid justify-between grid-cols-12 px-1 py-1 mt-3 rounded-lg shadow-sm'>
              <div className='col-span-8'>
                <div className='grid items-center grid-cols-12 '>
                  <div className='col-span-2 '>
                    <img src='.\src\assets\pp.jpg' className='object-cover w-8 h-8 rounded-full'></img>
                  </div>
                  <div className='col-span-9 px-2'>
                    <p className='font-semibold text-gray-800 dark:text-gray-300'>
                      Roman Humagain
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-span-4 '>
                <div className='left-0'>
                  <button className={`text-sm border-2 border-gray-400 dark:text-gray-300  px-2 py-[3px] rounded-full font-semibold transition-transform hover:scale-105 duration-700 hover:bg-gray-300 dark:hover:bg-neutral-700 `}>Follow</button>
                </div>
              </div>
            </div>

            <div className='grid justify-between grid-cols-12 px-1 py-1 mt-3 rounded-lg shadow-sm'>
              <div className='col-span-8'>
                <div className='grid items-center grid-cols-12 '>
                  <div className='col-span-2 '>
                    <img src='.\src\assets\pp1.jpg' className='object-cover w-8 h-8 rounded-full'></img>
                  </div>
                  <div className='col-span-9 px-2'>
                    <p className='font-semibold text-gray-800 dark:text-gray-300'>
                      Pratap Yadav
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-span-4 '>
                <div className='left-0'>
                  <button className={`text-sm border-2 border-gray-400 dark:text-gray-300  px-2 py-[3px] rounded-full font-semibold transition-transform hover:scale-105 duration-700 hover:bg-gray-200 dark:hover:bg-neutral-700`}>Follow</button>
                </div>
              </div>
            </div>

            <div className='grid justify-between grid-cols-12 px-1 py-1 mt-3 rounded-lg shadow-sm'>
              <div className='col-span-8'>
                <div className='grid items-center grid-cols-12 '>
                  <div className='col-span-2 '>
                    <img src='.\src\assets\pp2.png' className='object-cover w-8 h-8 rounded-full'></img>
                  </div>
                  <div className='col-span-9 px-2'>
                    <p className='font-semibold text-gray-800 dark:text-gray-300'>
                      Suryanshu Verma
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-span-4 '>
                <div className='left-0'>
                  <button className={`text-sm border-2 border-gray-400 dark:text-gray-300  px-2 py-[3px] rounded-full font-semibold transition-transform hover:scale-105 duration-700 hover:bg-gray-200 dark:hover:bg-neutral-700 `}>Follow</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='flex flex-col p-3 mb-3 '>
          <div>
            <p className='text-gray-700 dark:text-gray-300 text-xl lg:text-[22px] font-bold mt-1 mb-2'>Trending posts</p>
          </div>
          <div className='grid grid-cols-12 gap-4 mt-3 mb-2' >
            <div className='col-span-2 overflow-hidden '>
              <img className='object-cover w-full h-10 ' src='https://imgs.search.brave.com/rRwIMt5dkBVI5U6xeo3mH-DOA4x_hjYYk7XuCODFKWg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg0/OTQ4MzczL3Bob3Rv/L2Nsb3NlLXVwLW9m/LWEtYmxvZy1rZXku/d2VicD9iPTEmcz0x/NzA2NjdhJnc9MCZr/PTIwJmM9RGdUX20z/LXVZRVZLZjBwVjM3/bERRbVd3V2Y1OHZR/LUdVelpndkFoazZa/QT0' alt='img'></img>
            </div>
            <div className='col-span-10'>
              <p className='font-semibold text-gray-700 cursor-pointer dark:text-gray-300 text-md'>Beauty of Nature</p>
              <p className='mt-1 text-xs text-gray-600 dark:text-gray-400'>By Roman Humagain</p>
            </div>

          </div>

          <div className='grid grid-cols-12 gap-4 mt-3 ' >
            <div className='col-span-2 overflow-hidden '>
              <img className='object-cover w-full h-10 ' src='https://imgs.search.brave.com/bYn-2TuWQ4VkpEQuTn2jvu1ZswPDgGp-6-cMyRfAaXk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vNDcvMjQ2MjQ3/LTA1MC1GMTAyMURF/OS9BSS10ZXh0LXRv/LWltYWdlLXBob3Rv/LXJvYm90LXdpdGgt/Y29tcHV0ZXIuanBn/P3c9NDAwJmg9MzAw/JmM9Y3JvcA' alt='img'></img>
            </div>
            <div className='col-span-10'>
              <p className='font-semibold text-gray-700 cursor-pointer dark:text-gray-300 text-md'>Artificial Intelligence</p>
              <p className='mt-1 text-xs text-gray-600 dark:text-gray-400'>By Suryanshu Verma</p>
            </div>

          </div>

           <div className='grid grid-cols-12 gap-4 mt-3 ' >
            <div className='col-span-2 overflow-hidden '>
              <img className='object-cover w-full  h-9' src='https://imgs.search.brave.com/kWh_6AQWS9PTr_gkaZJlxXZP8RWHRDZQcUqNzXigZqU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS93aGF0aXMvaW1n/X3JlYWN0LmpwZw' alt='img'></img>
            </div>
            <div className='col-span-10'>
              <p className='text-sm font-semibold text-gray-700 dark:text-gray-300 '>React - Popular Frontend Framework</p>
              <p className='mt-1 text-xs text-gray-600 dark:text-gray-400'>By Bijen Shrestha</p>
            </div>

          </div> 
        </div>

        <div className='flex flex-col gap-3 p-3 mt-5 mb-3'>
          <p className='text-gray-700 dark:text-gray-300 text-xl lg:text-[22px] font-bold mb-1'>Topics for you</p>

          <div className='flex flex-wrap gap-2'>

            <div>
              <button className={`text-sm border-2 dark:text-gray-200 border-gray-400  px-2 py-[3px] rounded-full font-semibold bg-gray-200 dark:bg-neutral-900 transition-transform hover:scale-105 duration-500`}>All</button>
            </div>

            {blogCategory && blogCategory.map((category, ind) => (
              <div key={ind}>
                <button className={`text-sm border-2 dark:text-gray-300 border-gray-400 px-2 py-[3px] rounded-full font-semibold bg-gray-200 dark:bg-neutral-900 hover:border-gray-600 dark:hover:border-gray-200  transition-transform hover:scale-105 duration-700`}>
                  {category.category}
                </button>
              </div>
            ))}


          </div>
        </div>
        <hr className="mx-8 border-t border-gray-400 dark:border-gray-500 " />

        <div className='mt-2 text-center'>

          <div className='mt-5 mb-4 text-sm text-gray-700 md:flex-grow dark:text-gray-400 '><p>
            © Copyright Blogify - Where Ideas Thrive
          </p></div>

          {/* <div className='flex justify-center gap-4 text-xl text-neutral-900 dark:text-gray-100'>
            <FaFacebook className='p-2 text-3xl transition-transform duration-500 bg-gray-300 rounded-full cursor-pointer hover:scale-110 dark:bg-neutral-700' />
            <FaInstagram className='p-2 text-3xl transition-transform duration-500 bg-gray-300 rounded-full cursor-pointer hover:scale-110 dark:bg-neutral-700' />
            <FaXTwitter className='p-2 text-3xl transition-transform duration-500 bg-gray-300 rounded-full cursor-pointer hover:scale-110 dark:bg-neutral-700' />
            <FaLinkedin className='p-2 text-3xl transition-transform duration-500 bg-gray-300 rounded-full cursor-pointer hover:scale-110 dark:bg-neutral-700' />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default PopularSection