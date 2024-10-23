import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const Notification = ({ notification, closeModal }) => {
    
    return (
        <Link
            to={
                notification.category === "follow" 
                ? `/profile/${notification?.actor.slug}`
                : (notification.category === "like" || notification.category === "comment" || notification.category === "like_comment") 
                ? `/blog-details/${notification?.post_slug}/`
                : ""
            }
            onClick={closeModal}  // Call closeModal when the link is clicked
        >
        
            <div className='grid items-center grid-cols-12 mb-5 '>

                <div className='col-span-2'>
                    <img src={notification?.actor.profile_pic} height={40} width={40} className='rounded-full' alt="Actor's profile"></img>
                </div>

                <div className='col-span-9 text-gray-700 dark:text-gray-400'>
                    <div className='flex flex-col gap-1'>
                        <p>{notification.message}</p>
                        <p className='text-sm font-light text-neutral-500'>
                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </p>
                    </div>
                </div>

            </div>
        </Link>

    )
}

export default Notification
