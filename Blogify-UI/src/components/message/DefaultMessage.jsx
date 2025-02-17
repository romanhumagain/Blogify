import React from 'react'
import { BsChatHeartFill } from "react-icons/bs";
const DefaultMessage = () => {
    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen '>
                <BsChatHeartFill className='text-5xl text-rose-400' />

                <p className='mt-3 text-xl font-bold text-gray-800 dark:text-gray-200'>Your Messages</p>
                <p className='text-lg text-gray-700 font-mediums dark:text-gray-300'>Send a message to start a chat</p>
            </div>
        </>

    )
}

export default DefaultMessage