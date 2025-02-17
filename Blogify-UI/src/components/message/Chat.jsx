import React from 'react'
import pp from '../../assets/pp.jpg'
import { GoDotFill } from "react-icons/go";

const Chat = ({chat}) => {
    const unreadTextColor = 'text-gray-800 dark:text-gray-100'
    return (
        <div className='grid grid-cols-12 mb-4'>
            <div className='col-span-2 '>
                <img src={pp} className='object-cover w-12 h-12 rounded-full'></img>
            </div>

            <div className='col-span-10 '>
                <div>
                    <p className='text-gray-800 dark:text-gray-100'>{chat.name}</p>
                </div>
                <div className='flex items-center justify-between pr-3 text-gray-600 dark:text-gray-400'>
                    <p className={`pr-2 truncate ${!chat.is_read && unreadTextColor}`}>{chat.last_message}</p>
                    <div className='flex items-center gap-2'>
                      <p>{chat.sent_at}</p>
                      
                    <GoDotFill className={`${chat.is_read ?'hidden':''} text-[20px] text-blue-600`} />  
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Chat