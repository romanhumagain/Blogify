import React, { useEffect, useState } from 'react'
import { FaComment } from "react-icons/fa";
import CommentList from './CommentList';
import { IoMdSend } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { useComment } from '../../context/CommentContext';


const CommentSection = ({ slug }) => {
  const { fetchCommentsLists,setPostSlug,  commentsDetails, postComment, isCommentAdded, setIsCommentAdded } = useComment();
  // const [editableComment, setEditableComment] = useState(null)

  const form = useForm({
    defaultValues: {
      comment: ''
    }
  })

  const { register, reset, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  const handlePostComment = async (data) => {
    if (slug) {
      postComment(slug, data);
      reset();
      fetchCommentsLists(slug)
    }
  }

  useEffect(() => {
    fetchCommentsLists(slug)
  }, [slug])

  useEffect(() => {
    if (isCommentAdded) {
      fetchCommentsLists(slug)
      setIsCommentAdded(false)
    }
  }, [isCommentAdded])

  useEffect(() => {
    setPostSlug(slug)
  }, [slug])

  return (
    <>
      <div className='relative right-5 col-span-5 p-10 px-12 pb-4 rounded-lg shadow-xs  bg-gray-50 dark:bg-neutral-950 h-[90vh]'>
        {/* Scrollable comment section */}
        <div className='overflow-y-scroll h-[calc(100%-10px)] hide-scrollbar'>
          <div className='h-[500px]'>
            <div className='mb-4 text-gray-900 dark:text-gray-200'>
              <p className='flex items-center gap-2 text-2xl font-bold'><FaComment />Comments</p>
            </div>

            <div className='flex flex-col gap-2'>
              {commentsDetails && commentsDetails.length > 0 ? commentsDetails.map((comment, ind) => (
                <div key={ind}>
                  <CommentList comment={comment} slug={slug} setEditableComment={setValue} />
                </div>
              )) : (
                <p className='mt-2 text-lg font-light text-neutral-500'>No comment found for this post !</p>
              )}

            </div>
          </div>
        </div>

        {/* Input form positioned at the bottom, fixed within this container */}
        <div className='absolute w-full px-8 left-5 -bottom-5'>
          <form autoComplete='off' onSubmit={handleSubmit(handlePostComment)}>
            <input
              className='text-[15px] shadow-md appearance-none border rounded-xl w-full py-3 px-3 pr-10 leading-tight focus:outline-none dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 placeholder:text-neutral-500 placeholder:text-[16px]'
              id='title'
              type='text'
              name='title'
              placeholder='Write Comment ....'
              {...register("comment")}
            />
            <button type='submit' className='absolute -translate-y-1/2 top-1/2 right-10'>
              <IoMdSend className='text-2xl cursor-pointer text-neutral-500' />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CommentSection