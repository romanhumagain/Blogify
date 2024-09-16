import React, { memo } from 'react'
import { IoArrowForward } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { TbLocationShare } from "react-icons/tb";
import ImageCarousel from './ImageCarousel';
import { Link } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa6";
import { Toaster } from 'react-hot-toast';
import { useBlog } from '../context/BlogContext';

const Blog = ({ blog }) => {
  console.log(blog)
  const { savePost, unsavePost, likePost, unLikePost } = useBlog()

  const truncateContent = (content, max_length) => {
    return content.length <= max_length ? content : `${content.slice(0, max_length)}.....`
  }

  return (
    <>
      <div className='w-full max-w-xl p-5 ml-5 bg-gray-100 shadow-lg dark:bg-neutral-900 rounded-xl'>
        <div className='flex items-center justify-between p-3 px-3'>
          <div className='flex items-center gap-2'>
            <div className="relative overflow-hidden rounded-full w-9 h-9">
              <img
                src={blog?.author.profile_pic}
                className="object-cover w-full h-full"
                alt="Profile"
              />
            </div>
            <div>
              <Link to={`/profile/${blog?.author.slug}`}>
                <p className='font-semibold text-gray-700 cursor-pointer dark:text-gray-300 text-md'>{blog.author.full_name}</p>
              </Link>

              <div className=''>
                <p className='text-xs text-gray-600 dark:text-neutral-500 text-start'>
                  {new Date(blog.created_at).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
            </div>

          </div>
          <div className=''>
            <button type='button' className={`text-xs border-2 border-gray-400 dark:text-gray-200  px-3 py-[3px] rounded-full font-semibold`}>{blog?.category.category}</button>
          </div>

        </div>

        {blog.images.length > 0 && (
          <div className='mx-3 overflow-hidden rounded-lg h-72'>
            <ImageCarousel images={blog.images} />
          </div>
        )}

        <div className='m-4 mt-4'>
          <Link to={`/blog-details/${blog.slug}`}>
            <p className='text-[24px] text-gray-800 dark:text-gray-200 font-bold my-2 cursor-pointer transition-opacity hover:opacity-80 duration-300 text-start'>
              {blog.title}
            </p>
          </Link>
          <div>
            <p className='text-justify text-gray-600 text-md dark:text-gray-300'
              dangerouslySetInnerHTML={{ __html: truncateContent(blog.content.replace(/<[^>]*>?/gm, ''), 500) }}
            />
          </div>

          <div className='grid grid-cols-12 mt-5 text-gray-800 dark:text-gray-300'>
            <div className='col-span-6 font-bold text-[15px]'>
              {blog.is_saved ? (
                <p className='flex items-center gap-1'>
                  <span className='text-xl transition-transform duration-500 cursor-pointer hover:scale-110'>
                    <FaBookmark onClick={() => unsavePost(blog?.saved_post_slug)} />
                  </span>
                  Saved
                </p>
              ) : (
                <p className='flex items-center gap-1 font-semibold'>
                  <span className='text-2xl transition-transform duration-500 cursor-pointer hover:scale-110'>
                    <CiBookmark onClick={() => savePost(blog?.slug)} />
                  </span>
                  Save for later
                </p>
              )}

            </div>
            <div className='flex justify-end col-span-6 font-semibold'>
              <Link to={`/blog-details/${blog.slug}`}>
                <p className='flex items-center gap-1 transition-transform duration-500 cursor-pointer text-md hover:scale-105'>
                  Read More<IoArrowForward />
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className='flex items-start justify-center gap-12 mt-4 text-2xl text-gray-700 dark:text-gray-400'>
          <div className='flex flex-col items-center gap-1'>
            <div>
              {blog?.is_liked ?
                <IoMdHeart className='text-[28px] text-red-600 transition-transform duration-500 cursor-pointer hover:scale-110'
                  onClick={() => {
                    unLikePost(blog?.slug)
                  }}
                />
                :
                <IoMdHeartEmpty className='text-[28px] transition-transform duration-500 cursor-pointer hover:scale-110'
                  onClick={() => {
                    likePost(blog?.slug)
                  }} />
              }
            </div>
            <div>
              <p className='text-sm text-neutral-500'>{blog?.liked_count ? `${blog?.liked_count} likes`:'' }</p>
            </div>
          </div>

          <FaRegComment className='transition-transform duration-500 cursor-pointer hover:scale-110' />
          <TbLocationShare className='transition-transform duration-500 cursor-pointer hover:scale-110' />
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default memo(Blog)
