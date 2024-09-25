import React, { memo, useState } from 'react'
import { IoArrowForward } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { TbLocationShare } from "react-icons/tb";
import ImageCarousel from './ImageCarousel';
import { Link } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa6";
import { Toaster } from 'react-hot-toast';
import { useBlog } from '../context/BlogContext';
import { IoMdSend } from "react-icons/io";
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

const Blog = ({ blog }) => {
  console.log(blog)
  const { savePost, unsavePost, likePost, unLikePost, postComment } = useBlog();
  const [isCommentTextFieldOpen, setIsCommentTextFieldOpen] = useState(true);
  const {authenticatedUser } = useAuth();

  // to handle the react hook form
  const form = useForm({
    defaultValues:{
      comment:''
    }
  });

  const {register,handleSubmit, formState, reset} = form;
  const {error} = formState;

  const truncateContent = (content, max_length) => {
    return content.length <= max_length ? content : `${content.slice(0, max_length)}.....`
  }


  // function to handle the comment 
  const handlePostComment = async (data)=>{
    if(blog?.slug){
      postComment(blog?.slug, data);
      reset();
    }
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
              <p className='text-sm text-neutral-500'>{blog?.liked_count ? `${blog?.liked_count} likes` : ''}</p>
            </div>
          </div>

          <FaRegComment className='transition-transform duration-500 cursor-pointer hover:scale-110'
          //  onClick={() => { setIsCommentTextFieldOpen(true) }} 
           />
          <TbLocationShare className='transition-transform duration-500 cursor-pointer hover:scale-110' />
        </div>
        <div className={`${isCommentTextFieldOpen ? '' : 'hidden'} grid items-center grid-cols-12 mt-2 `}>
          <div className='flex col-span-1 gap-4'>
            <div className='flex items-center justify-center gap-5 '>
              <img
                className='object-cover w-10 h-10 transition-transform duration-700 rounded-full cursor-pointer hover:scale-110'
                src={`http://127.0.0.1:8000/${authenticatedUser?.profile_pic}`}
                alt='User avatar'
              />
            </div>
          </div>
          <div className='relative col-span-11 mx-3 '>
          <form onSubmit={handleSubmit(handlePostComment)} autoComplete='off'>
            <input
              className='text-[15px] shadow-md appearance-none border rounded-xl w-full py-3 px-3 pr-10 leading-tight focus:outline-none dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 placeholder:text-neutral-500 placeholder:text-[16px]'
              id='title'
              type='text'
              name='title'
              placeholder='Write Comment ....'
              {...register("comment")}
              
            />
            <button type='submit' className='absolute -translate-y-1/2 top-1/2 right-2'>
            <IoMdSend className='text-2xl cursor-pointer text-neutral-500' />
            </button>
          </form>
            
          </div>
          {/* <div className='col-span-1 px-6'>
            
          </div> */}
        </div>

      </div>
      <Toaster />
    </>
  )
}

export default memo(Blog)
