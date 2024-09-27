import React, { useEffect, useState } from 'react'
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { formatDistanceToNow } from 'date-fns';
import { MdOutlineMoreHoriz } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useComment } from '../../context/CommentContext';


const CommentList = ({ comment, slug, setEditableComment }) => {
  const [isMoreOptionHidden, setisMoreOptionHidden] = useState(true)
  const { fetchCommentsLists, likeComment, unLikeComment } = useComment();
  const { axiosInstance, authenticatedUser } = useAuth();

  // function to delete comment
  const deleteComment = async (id) => {
    try {
      const response = await axiosInstance.delete(`comments/${id}`)
      if (response.status === 200) {
        toast.success("Successfully delete comment.")
        fetchCommentsLists(slug);
        setisMoreOptionHidden(true)
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser();
        }
        toast.error(message);
      } else {
        console.log(error);
      }
      console.log(error);
    }
  }
  // Convert the timestamp into a date and calculate the time ago
  const timeAgo = formatDistanceToNow(new Date(comment?.timestamp), { addSuffix: true });

  return (
    <>
      <div className='grid items-start grid-cols-12 p-2 pb-5' >
        <div className='col-span-2 '>
          <img className='object-cover w-10 h-10 transition-transform duration-700 rounded-full cursor-pointer hover:scale-110' src={comment.user_details.profile_pic} ></img>
        </div>

        <div className='col-span-9 text-gray-900 dark:text-gray-200'>
          <p className='text-sm font-bold'>
            {comment?.user_details.full_name}
          </p>
          <p className='font-light text-gray-700 text-md dark:text-gray-300'>{comment?.comment}</p>
          <div className='flex gap-5 mt-1 text-sm text-center '>
            <p className=''>{timeAgo === "less than a minute ago" ? 'Just now' : timeAgo}</p>

            {comment?.liked_count > 0 && (
              <p>{comment?.liked_count} likes</p>
            )}
            {comment?.user_details.slug === authenticatedUser?.slug && (
              <div className='relative px-5'>
                <p className={`text-lg`} onClick={() => { setisMoreOptionHidden(!isMoreOptionHidden) }}><MdOutlineMoreHoriz /></p>
                {!isMoreOptionHidden && (
                  <div className='absolute flex flex-col gap-3 p-3 text-lg bg-gray-200 rounded-lg dark:bg-neutral-700 -top-1 -right-8'>
                    <p className='cursor-pointer hover:text-red-600'
                      onClick={() => { deleteComment(comment?.id) }}
                    ><MdDelete /></p>
                    <p className='cursor-pointer hover:text-sky-600'
                      onClick={() => setEditableComment('comment', comment?.comment)}
                    ><BiSolidEditAlt /></p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
        <div className='col-span-1'>
          {comment?.is_liked ? (
            <IoMdHeart className='text-[20px] text-red-600 ' onClick={() => unLikeComment(comment?.id)} />
          ) :
            (
              <IoMdHeartEmpty className='text-[20px] text-black dark:text-white ' onClick={() => likeComment(comment?.id)} />
            )}
        </div>
      </div>
    </>
  )
}

export default CommentList