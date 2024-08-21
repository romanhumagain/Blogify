import React from 'react'
import { useState } from 'react'
import { MdCancel } from "react-icons/md";

const SearchModal = ({ isOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    
    return (
        <>
            <div className={`fixed right-0 top-0 z-50 left-20 bottom-0  justify-start bg-gray-100 dark:bg-neutral-950 w-full md:w-1/4 lg:w-[27%] rounded-r-2xl border-r border-gray-300 dark:border-neutral-500 ${isModalOpen ? "opacity-100" : "opacity-0 invisible"}`}
                role="dialog"
                aria-modal="true">
                <div className='p-8'>
                    <p className='text-gray-800 dark:text-gray-200 text-2xl font-semibold px-1'>Search</p>

                    <div className='mt-2 relative'>
                        <input type='text' className='w-full p-2 rounded-xl bg-gray-200 dark:bg-neutral-800 focus:outline-none border border-gray-300 dark:border-neutral-700 text-black dark:text-white placeholder:text-neutral-500' placeholder='Search'></input>
                        <MdCancel className='absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-500'/>
                    </div>

                    <hr className='border-1 border-gray-400 dark:border-neutral-700 mt-6 mx-1'/>

                    <p className='text-gray-600 dark:text-neutral-500 text-lg font-semibold px-1 mt-1'>Recent</p>

                    <div className='flex justify-center items-center h-full'>
                    <p className='text-gray-600 dark:text-neutral-500 text-lg px-1 mt-20'>No Recent Searches</p>

                    </div>
                </div>

            </div>
        </>
    )
}

export default SearchModal