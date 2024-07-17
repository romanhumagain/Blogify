import React, { memo} from 'react'
import { IoArrowForward } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { TbLocationShare } from "react-icons/tb";
import ImageCarousel from './ImageCarousel';
import { Link } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa6";
import { Toaster } from 'react-hot-toast';
import { useBlog } from '../context/BlogContext';

const Blog = ({ blog }) => {
  const { savePost, unsavePost } = useBlog()

  const truncateContent = (content, max_length) => {
    return content.length <= max_length ? content : `${content.slice(0, max_length)}.....`
  }

  return (
    <>
      <div className='bg-gray-100 dark:bg-neutral-800 max-w-2xl w-full ml-5 shadow-lg rounded-xl p-5'>
        <div className='flex justify-between items-center p-3 px-3'>
          <div className='flex items-center gap-2'>
            <img src='.\src\assets\pp.jpg' className='rounded-full h-7 w-7 hover:scale-110 transition-all duration-500 cursor-pointer' alt={`${blog.author.full_name}'s profile`} />
            <p className='text-gray-700 dark:text-gray-300 font-semibold text-md cursor-pointer'>{blog.author.full_name}</p>
          </div>
          <div>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              {new Date(blog.created_at).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        </div>

        {blog.images.length > 0 && (
          <div className='overflow-hidden h-72 rounded-lg mx-3'>
            <ImageCarousel images={blog.images} />
          </div>
        )}

        <div className='m-4 mt-7'>
          <Link to={`/blog-details/${blog.slug}`}>
            <p className='text-[24px] text-gray-800 dark:text-gray-200 font-bold my-2 cursor-pointer transition-opacity hover:opacity-80 duration-300'>
              {blog.title}
            </p>
          </Link>
          <div>
            <p className='text-md text-gray-600 dark:text-gray-300 text-justify'
              dangerouslySetInnerHTML={{ __html: truncateContent(blog.content.replace(/<[^>]*>?/gm, ''), 500) }}
            />
          </div>

          <div className='grid grid-cols-12 mt-5'>
            <div className='col-span-6 font-bold text-[15px]'>
              {blog.is_saved ? (
                <p className='flex items-center gap-1'>
                  <span className='text-xl cursor-pointer hover:scale-110 transition-transform duration-500'>
                    <FaBookmark onClick={() => unsavePost(blog?.saved_post_slug)} />
                  </span>
                  Saved
                </p>
              ) : (
                <p className='flex items-center gap-1'>
                  <span className='text-2xl cursor-pointer hover:scale-110 transition-transform duration-500'>
                    <CiBookmark onClick={() => savePost(blog?.slug)} />
                  </span>
                  Save for later
                </p>
              )}

            </div>
            <div className='col-span-6 font-semibold flex justify-end'>
              <Link to={`/blog-details/${blog.slug}`}>
                <p className='font-bold flex items-center gap-1 text-md cursor-pointer hover:scale-105 transition-transform duration-500'>
                  Read More<IoArrowForward />
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className='flex gap-8 justify-center items-center text-2xl mt-4'>
          <FcLike className='cursor-pointer hover:scale-125 transition-transform duration-500' />
          <FaRegComment className='cursor-pointer hover:scale-125 transition-transform duration-500' />
          <TbLocationShare className='cursor-pointer hover:scale-125 transition-transform duration-500' />
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default memo(Blog)
