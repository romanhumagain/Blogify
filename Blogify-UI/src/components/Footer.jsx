import React from 'react'
import BlogifyLogo from './BlogifyLogo'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className='bg-slate-200 dark:bg-neutral-700 shadow-lg'>
        <div className='p-10  grid md:grid-cols-6 lg:grid-cols-12 gap-5 '>
          <div className='md:col-span-3 p-10'>
            <BlogifyLogo/>
          </div>

          <div className='md:col-span-3  p-3'>
            <p className='text-gray-700 dark:text-gray-300 mb-2 font-serif text-xl lg:text-2xl font-bold'>Subscription</p>
            <input type='email' className='rounded-md text-md outline-none h-8 p-4 w-40 md:w-60' placeholder='Your email address'></input>
            <button type='submit' className='block bg-teal-500 mt-3 p-1 rounded-md px-5 hover:bg-teal-600 dark:text-white dark:bg-teal-600 dark:hover:bg-teal-700 transition-colors duration-500 text-gray-100 font-semibold'>Subscribe</button>
          </div>

          <div className='md:col-span-3 p-3'>
            <div>
              <p className='text-gray-700 dark:text-gray-300 font-serif text-xl lg:text-2xl font-bold'>Recent Posts</p>
            </div>
            <div className='mt-3' >
              <p className='text-gray-700 dark:text-gray-300 font-serif mt-2 text-lg '>Beauty of Nature</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>March 29, 2024</p>
            </div>

            <div className='mt-4'>
              <p className='text-gray-700 dark:text-gray-300 font-serif mt-2 text-lg '>Artifical Intelligence</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>January 29, 2024</p>
            </div>

            <div className='mt-5'>
              <p className='text-gray-700 dark:text-gray-300 font-serif mt-2 text-lg'>Django- a powerful backend framework</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>February 29, 2024</p>
            </div>

            <div className='mt-5'>
              <p className='text-gray-700 dark:text-gray-300 font-serif mt-2 text-lg '>React- most popular front end framework</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>August 29, 2024</p>
            </div>
          </div>

          <div className='md:col-span-3 p-3'>
            <div>
              <p className='text-gray-700 dark:text-gray-300 font-serif text-xl lg:text-2xl font-bold'>Most Popular Posts</p>
            </div>

            <div className='mt-4'>
              <p className='text-gray-700 dark:text-gray-300 font-serif mt-2 text-lg '>Artifical Intelligence</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>April 29, 2024</p>
            </div>

            <div className='mt-5'>
              <p className='text-gray-700 dark:text-gray-300 font-serif mt-2 text-lg '>Django Rest Framework- a powerful backend framework</p>
              <p className='text-gray-600 dark:text-gray-400 font-serif text-xs mt-1'>June 29, 2024</p>
            </div>
          </div>

        </div>
        <hr className="mx-12 md:mx-16 border-t border-gray-700 dark:border-gray-300" />

        <div className=' p-8 px-12 lg:px-28 md:flex md:justify-between gap-10'>

          <div className='md:flex-grow text-sm lg:text-lg dark:text-gray-300 mb-7'><p>
          © Copyright Blogify - Where Ideas Thrive
          </p></div>

          <div className='md:flex gap-5 text-md space-x-3 lg:text-lg dark:text-gray-300 flex-wrap'>
        <Link to="/" className='text-lg font-semibold hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-500'>Home</Link>
          <Link to="/about" className='text-lg font-semibold hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-500'>About</Link>
          <Link to="/contact" className='text-lg font-semibold hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-500'>Contact</Link>
          <Link to="/blog-post" className='text-lg font-semibold hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-500'>Post Blog</Link>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer