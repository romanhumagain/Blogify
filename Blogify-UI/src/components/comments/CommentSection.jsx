import React, { useEffect } from 'react'
import { FaComment } from "react-icons/fa";
import CommentList from './CommentList';
import { useBlog } from '../../context/BlogContext';
import { IoMdSend } from "react-icons/io";


const CommentSection = ({ slug }) => {
  const { fetchCommentsLists, commentsDetails } = useBlog();

  useEffect(() => {
    fetchCommentsLists(slug)
  }, [slug])

  return (
    <>
      <div className='text-gray-900 dark:text-gray-200'>
        <p className='flex items-center gap-2 text-2xl font-bold'><FaComment />Comments</p>
      </div>

      <div>
        {commentsDetails && commentsDetails.length > 0 ? commentsDetails.map((comment, ind) => (
          <div key={ind}>
            <CommentList comment={comment} />
          </div>
        )) : (
          <p className='mt-2 text-lg font-light text-neutral-500'>No comment found for this post !</p>
        )}

      </div>
      
    </>
  )
}

export default CommentSection