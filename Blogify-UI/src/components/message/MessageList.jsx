import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import Chat from './Chat';

const MessageList = () => {
    const chatData = [
        {
            name: "Roman Humagain",
            last_message: "Hello, Roman... How are you?",
            is_read: false,
            sent_at: "1min"
        },

        {
            name: "Anuj Gautam",
            last_message: "Kaa ho sir?",
            is_read: true,
            sent_at: "24hr"
        },

        {
            name: "Pratap Yadav",
            last_message: "Hello",
            is_read: true,
            sent_at: "1d"
        },

        {
            name: "Suryanshu Verma",
            last_message: "How is your study going?",
            is_read: true,
            sent_at: "2d"
        },
    ]
    return (
        <div className='h-screen bg-gray-100 border-r border-gray-200 dark:border-neutral-800 dark:bg-neutral-900 '>

            <div className='p-4 pt-5'>
                <div className='flex items-center justify-between '>
                    <div className='flex items-center justify-start gap-2 text-gray-800 dark:text-gray-200 '>
                        <p className='text-lg'>roman_humagain</p>
                        <IoIosArrowDown size={20} />
                    </div>

                    <TbListDetails size={24} className='text-gray-800 dark:text-gray-200' />
                </div>
                <hr className='mt-3 mb-2 border border-gray-300 dark:border-neutral-800' />
                <p className='text-[17px] font-semibold text-gray-700 dark:text-gray-300 mb-5'>
                    Messages
                </p>
                {
                    chatData.map((chat, ind) => {
                        return <div key={ind}>
                            <Chat chat={chat} />
                        </div>
                    }
                    )
                }
            </div>
        </div>
    )
}

export default MessageList