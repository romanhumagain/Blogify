import React from 'react'
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { formatDistanceToNow } from 'date-fns';

const CommentList = ({comment}) => {
    
     // Convert the timestamp into a date and calculate the time ago
    const timeAgo = formatDistanceToNow(new Date(comment?.timestamp), { addSuffix: true });
  return (
    <>
       <div className='grid items-start grid-cols-12 mt-8'>
              <div className='col-span-2 '>
                <img className='object-cover w-10 h-10 transition-transform duration-700 rounded-full cursor-pointer hover:scale-110' src={comment.user_details.profile_pic} ></img>
              </div>

              <div className='col-span-9 text-gray-900 dark:text-gray-200'>
                <p className='text-sm font-bold'>
                  {comment?.user_details.full_name}
                </p>
                <p className='font-light text-gray-700 text-md dark:text-gray-300'>{comment?.comment}</p>
                <div className='flex gap-5 mt-1 text-xs'>
                  <p>{timeAgo}</p>
                  <p>4 likes</p>

                  </div>

              </div>
              <div className='col-span-1'>
                <IoMdHeart className='text-[20px] text-red-600' />
              </div>
            </div> 
    </>
  )
}

export default CommentList