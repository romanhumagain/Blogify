import React from 'react'
import { useState } from 'react'

const NotificationModal = ({ isOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    
    return (
        <>
            <div className={`fixed right-0 top-0 z-50 left-20 bottom-0  justify-start bg-gray-100 dark:bg-neutral-950 w-full md:w-1/4 lg:w-[27%] rounded-r-2xl border-r border-gray-300 dark:border-neutral-500 ${isModalOpen ? "opacity-100" : "opacity-0 invisible"}`}
                role="dialog"
                aria-modal="true">
                <div className='p-8'>
                    <p className='text-gray-800 dark:text-gray-200'>Notification !</p>
                </div>

            </div>
        </>
    )
}

export default NotificationModal