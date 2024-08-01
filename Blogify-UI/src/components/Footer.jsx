import React from 'react'
import BlogifyLogo from './BlogifyLogo'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";

const Footer = () => {
  return (
    <>
      <footer className='bg-slate-100 dark:bg-neutral-800 border-t-2 border-gray-500 border-opacity-50' style={{ fontFamily: "Nunito Sans", fontWeight: '300' }}>
        <div className='p-10  grid md:grid-cols-6 lg:grid-cols-12 gap-5 '>
          <div className='md:col-span-3 p-3'>
            <BlogifyLogo />

            <div className='flex gap-4 text-gray-800 mt-10 text-xl md:text-2xl dark:text-gray-100'>
            <FaFacebook className='hover:text-rose-500 transition-colors duration-500 cursor-pointer' />
            <FaInstagram className='hover:text-rose-500 transition-colors duration-500 cursor-pointer' />
            <FaXTwitter className='hover:text-rose-500 transition-colors duration-500 cursor-pointer' />
            <FaLinkedin className='hover:text-rose-500 transition-colors duration-500 cursor-pointer' />
            <IoLogoYoutube className='hover:text-rose-500 transition-colors duration-500 cursor-pointer' />
            </div>
          </div>

          <div className='md:col-span-3  p-3'>
            <p className='text-gray-700 dark:text-gray-300 mb-2 font-mono text-xl lg:text-2xl font-bold'>Subscription</p>
            <input type='email' className='rounded-md text-md outline-none h-8 p-4 w-40 md:w-60' placeholder='Your email address'></input>
            <button type='submit' className='block bg-rose-500 mt-3 p-1 rounded-md px-5 hover:bg-rose-600 dark:text-white dark:bg-rose-600 dark:hover:bg-rose-700 transition-colors duration-500 text-gray-100 font-semibold'>Subscribe</button>
          </div>

          <div className='md:col-span-3 p-3'>
            <div>
              <p className='text-gray-700 dark:text-gray-300 font-mono text-xl lg:text-2xl font-bold'>Recent Posts</p>
            </div>
            <div className='mt-3 grid grid-cols-12 gap-4 ' >
              <div className='col-span-3 overflow-hidden '>
                <img className=' object-cover' src='https://imgs.search.brave.com/rRwIMt5dkBVI5U6xeo3mH-DOA4x_hjYYk7XuCODFKWg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg0/OTQ4MzczL3Bob3Rv/L2Nsb3NlLXVwLW9m/LWEtYmxvZy1rZXku/d2VicD9iPTEmcz0x/NzA2NjdhJnc9MCZr/PTIwJmM9RGdUX20z/LXVZRVZLZjBwVjM3/bERRbVd3V2Y1OHZR/LUdVelpndkFoazZa/QT0' alt='img'></img>
              </div>
              <div className='col-span-9'>
                <p className='text-gray-700 dark:text-gray-300 font-serif text-lg '>Beauty of Nature</p>
                <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>March 29, 2024</p>
              </div>

            </div>

            <div className='mt-3 grid grid-cols-12 gap-4 ' >
              <div className='col-span-3 overflow-hidden '>
                <img className=' object-cover' src='https://imgs.search.brave.com/bYn-2TuWQ4VkpEQuTn2jvu1ZswPDgGp-6-cMyRfAaXk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vNDcvMjQ2MjQ3/LTA1MC1GMTAyMURF/OS9BSS10ZXh0LXRv/LWltYWdlLXBob3Rv/LXJvYm90LXdpdGgt/Y29tcHV0ZXIuanBn/P3c9NDAwJmg9MzAw/JmM9Y3JvcA' alt='img'></img>
              </div>
              <div className='col-span-9'>
                <p className='text-gray-700 dark:text-gray-300 font-serif text-lg '>Artificial Intelligence</p>
                <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>August 10, 2024</p>
              </div>

            </div>

            

            <div className='mt-3 grid grid-cols-12 gap-4 ' >
              <div className='col-span-3 overflow-hidden '>
                <img className=' object-cover' src='https://imgs.search.brave.com/kWh_6AQWS9PTr_gkaZJlxXZP8RWHRDZQcUqNzXigZqU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS93aGF0aXMvaW1n/X3JlYWN0LmpwZw' alt='img'></img>
              </div>
              <div className='col-span-9'>
                <p className='text-gray-700 dark:text-gray-300 font-serif text-lg '>React - Popular Frontend Framework</p>
                <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>March 29, 2024</p>
              </div>

            </div>
          </div>

          <div className='md:col-span-3 p-3'>
            <div>
              <p className='text-gray-700 dark:text-gray-300 font-mono text-xl lg:text-2xl font-bold'>Most Popular Posts</p>
            </div>

            <div className='mt-3 grid grid-cols-12 gap-4 ' >
              <div className='col-span-3 overflow-hidden '>
                <img className=' object-cover' src='https://imgs.search.brave.com/bYn-2TuWQ4VkpEQuTn2jvu1ZswPDgGp-6-cMyRfAaXk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vNDcvMjQ2MjQ3/LTA1MC1GMTAyMURF/OS9BSS10ZXh0LXRv/LWltYWdlLXBob3Rv/LXJvYm90LXdpdGgt/Y29tcHV0ZXIuanBn/P3c9NDAwJmg9MzAw/JmM9Y3JvcA' alt='img'></img>
              </div>
              <div className='col-span-9'>
                <p className='text-gray-700 dark:text-gray-300 font-serif text-lg '>Artificial Intelligence</p>
                <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>August 10, 2024</p>
              </div>

            </div>

            <div className='mt-3 grid grid-cols-12 gap-4 ' >
              <div className='col-span-3 overflow-hidden  '>
                <img className=' object-cover' src='https://imgs.search.brave.com/bWb7wz1UXtGWG05l5_hu31z29wa0w4SGfECwEk1i5v0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amF2YXRwb2ludC5j/b20vZGphbmdvL2lt/YWdlcy9kamFuZ28t/dHV0b3JpYWwucG5n' alt='img'></img>
              </div>
              <div className='col-span-9'>
                <p className='text-gray-700 dark:text-gray-300 font-serif text-lg '>Django - A powerful backend framework</p>
                <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>July 15, 2024</p>
              </div>

            </div>
          </div>

        </div>
        <hr className="mx-12 md:mx-16 border-t border-gray-700 dark:border-gray-300" />

        <div className=' p-8 px-12 lg:px-28 md:flex md:justify-between gap-10'>

          <div className='md:flex-grow text-sm lg:text-lg text-gray-800 dark:text-gray-300 mb-7 font-mono'><p>
            © Copyright Blogify - Where Ideas Thrive
          </p></div>

          <div className='md:flex gap-5 text-md space-x-3 lg:text-lg text-gray-700 dark:text-gray-300 flex-wrap'>
            <Link to="/login" className='text-lg font-mono hover:text-rose-600 dark:hover:text-rose-500 transition-colors duration-500'>Home</Link>
            <Link to="/login" className='text-lg font-mono hover:text-rose-600 dark:hover:text-rose-500 transition-colors duration-500'>Contact</Link>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer