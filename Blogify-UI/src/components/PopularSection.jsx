import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";

const PopularSection = () => {
  return (
    <>
      <div className='h-screen bg-slate-50 dark:bg-neutral-900 rounded-sm' style={{fontFamily: "Nunito Sans"}}>
        <div className='flex flex-col p-3 mb-5 '>
          <div>
            <p className='text-gray-700 dark:text-gray-300 text-xl lg:text-xl font-semibold mt-6'>Recent Posts</p>
          </div>
          <div className='mt-3 grid grid-cols-12 gap-4 ' >
            <div className='col-span-3 overflow-hidden '>
              <img className=' object-cover' src='https://imgs.search.brave.com/rRwIMt5dkBVI5U6xeo3mH-DOA4x_hjYYk7XuCODFKWg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg0/OTQ4MzczL3Bob3Rv/L2Nsb3NlLXVwLW9m/LWEtYmxvZy1rZXku/d2VicD9iPTEmcz0x/NzA2NjdhJnc9MCZr/PTIwJmM9RGdUX20z/LXVZRVZLZjBwVjM3/bERRbVd3V2Y1OHZR/LUdVelpndkFoazZa/QT0' alt='img'></img>
            </div>
            <div className='col-span-9'>
              <p className='text-gray-700 dark:text-gray-300  text-md '>Beauty of Nature</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>March 29, 2024</p>
            </div>

          </div>

          <div className='mt-3 grid grid-cols-12 gap-4 ' >
            <div className='col-span-3 overflow-hidden '>
              <img className=' object-cover' src='https://imgs.search.brave.com/bYn-2TuWQ4VkpEQuTn2jvu1ZswPDgGp-6-cMyRfAaXk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vNDcvMjQ2MjQ3/LTA1MC1GMTAyMURF/OS9BSS10ZXh0LXRv/LWltYWdlLXBob3Rv/LXJvYm90LXdpdGgt/Y29tcHV0ZXIuanBn/P3c9NDAwJmg9MzAw/JmM9Y3JvcA' alt='img'></img>
            </div>
            <div className='col-span-9'>
              <p className='text-gray-700 dark:text-gray-300  text-md '>Artificial Intelligence</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>August 10, 2024</p>
            </div>

          </div>

          <div className='mt-3 grid grid-cols-12 gap-4 ' >
            <div className='col-span-3 overflow-hidden '>
              <img className=' object-cover' src='https://imgs.search.brave.com/kWh_6AQWS9PTr_gkaZJlxXZP8RWHRDZQcUqNzXigZqU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS93aGF0aXMvaW1n/X3JlYWN0LmpwZw' alt='img'></img>
            </div>
            <div className='col-span-9'>
              <p className='text-gray-700 dark:text-gray-300  text-md '>React - Popular Frontend Framework</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>March 29, 2024</p>
            </div>

          </div>
        </div>

        <div className='flex flex-col p-3'>
          <div>
            <p className='text-gray-700 dark:text-gray-300 text-xl lg:text-xl font-semibold'>Most Popular Posts</p>
          </div>

          <div className='mt-3 grid grid-cols-12 gap-4 ' >
            <div className='col-span-3 overflow-hidden '>
              <img className=' object-cover' src='https://imgs.search.brave.com/bYn-2TuWQ4VkpEQuTn2jvu1ZswPDgGp-6-cMyRfAaXk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vNDcvMjQ2MjQ3/LTA1MC1GMTAyMURF/OS9BSS10ZXh0LXRv/LWltYWdlLXBob3Rv/LXJvYm90LXdpdGgt/Y29tcHV0ZXIuanBn/P3c9NDAwJmg9MzAw/JmM9Y3JvcA' alt='img'></img>
            </div>
            <div className='col-span-9'>
              <p className='text-gray-700 dark:text-gray-300  text-md '>Artificial Intelligence</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>August 10, 2024</p>
            </div>

          </div>

          <div className='mt-3 grid grid-cols-12 gap-4 ' >
            <div className='col-span-3 overflow-hidden  '>
              <img className=' object-cover' src='https://imgs.search.brave.com/bWb7wz1UXtGWG05l5_hu31z29wa0w4SGfECwEk1i5v0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amF2YXRwb2ludC5j/b20vZGphbmdvL2lt/YWdlcy9kamFuZ28t/dHV0b3JpYWwucG5n' alt='img'></img>
            </div>
            <div className='col-span-9'>
              <p className='text-gray-700 dark:text-gray-300  text-md '>Django - A powerful backend framework</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>July 15, 2024</p>
            </div>

          </div>
        </div>
        <hr className="mx-8 border-t border-gray-400 dark:border-gray-500 mt-5" />

        <div className=' p-10'>

          <div className='md:flex-grow text-sm text-gray-700 dark:text-gray-400 mb-7 '><p>
            © Copyright Blogify - Where Ideas Thrive
          </p></div>

          <div className='flex justify-center gap-4 text-gray-800 mt-5 md:text-lg dark:text-gray-100'>
            <FaFacebook className='hover:text-teal-500 transition-colors duration-100 cursor-pointer' />
            <FaInstagram className='hover:text-teal-500 transition-colors duration-100 cursor-pointer' />
            <FaXTwitter className='hover:text-teal-500 transition-colors duration-100 cursor-pointer' />
            <FaLinkedin className='hover:text-teal-500 transition-colors duration-100 cursor-pointer' />
            <IoLogoYoutube className='hover:text-teal-500 transition-colors duration-100 cursor-pointer' />
            </div>
        </div>
      </div>
    </>
  )
}

export default PopularSection