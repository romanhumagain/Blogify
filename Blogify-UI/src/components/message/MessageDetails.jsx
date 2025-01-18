import React from 'react';
import pp from '../../assets/pp.jpg';
import { FiVideo } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

const MessageDetails = () => {
    return (
        <div className='relative h-screen p-4 bg-gray-200 dark:bg-neutral-800'>

            <div className='flex items-center justify-between pb-3 mb-4 border-b border-gray-300 dark:border-neutral-700'>
                <div className='flex items-center gap-4'>
                    <img 
                        src={pp} 
                        alt="Profile picture of Roman Humagain" 
                        className='object-cover rounded-full w-9 h-9'
                    />
                    <p className='text-[17px] text-gray-800 dark:text-gray-100'>Roman Humagain</p>
                </div>

                <div className='flex items-center gap-4 mr-2 text-gray-800 dark:text-gray-100'>
                    <button className='hover:text-blue-500'><FiVideo size={22} /></button>
                    <button className='hover:text-blue-500'><LuPhone size={19} /></button>
                    <button className='hover:text-blue-500'><IoIosInformationCircleOutline size={22} /></button>
                </div>
            </div>

            <div className='flex-1 overflow-y-auto'>
                {/* Messages go here */}
            </div>

            <div className='absolute bottom-0 left-0 flex items-center w-full gap-2 p-3 bg-gray-100 dark:bg-neutral-700'>
                <input 
                    className="w-full px-3 py-2 text-base leading-tight text-gray-800 border shadow appearance-none rounded-xl focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 dark:bg-neutral-700 dark:text-gray-300" 
                    id="message" 
                    type="text" 
                    name='message' 
                    placeholder="Type your message here..." 
                />
                <IoIosSend size={30} className='text-gray-800 dark:text-gray-200'/>
            </div>
        </div>
    );
};

export default MessageDetails;
