import React from 'react'
import { formatDistanceToNow } from 'date-fns';

const Notification = ({ notification }) => {
    return (
        <div className='grid items-center grid-cols-12 mb-5 '>

            <div className='col-span-2'>
                <img src={notification?.actor.profile_pic} height={40} width={40} className='rounded-full'></img>
            </div>

            <div className='col-span-9 text-gray-700 dark:text-gray-400'>
                <div className='flex flex-col gap-1'>
                    <p>{notification.message}</p>
                    <p className='text-sm font-light text-neutral-500'>{formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}</p>
                </div>
            </div>

        </div>

    )
}

export default Notification