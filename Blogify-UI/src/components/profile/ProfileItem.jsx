import React from 'react'
import pp_img from '../../assets/pp.jpg'
import { IoMdSettings } from "react-icons/io";
import { IoDocumentText, IoDocumentTextOutline, IoArchive, IoArchiveOutline, IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { useBlog } from '../../context/BlogContext';

const ProfileItem = ({user}) => {
    const { profileBlogPosts } = useBlog();

    return (
        <>
            <div className='mt-5 '>
                <div className='grid items-center grid-cols-12 gap-6'>
                    <div className="flex flex-col items-center col-span-4">
                        <img src={pp_img} className="p-6 rounded-full h-15 w-15" alt="Profile" />
                        <p className="text-xl font-semibold text-gray-700 dark:text-neutral-300">
                            {user?.full_name}
                        </p>
                        <p className='flex items-center mt-1 text-gray-700 dark:text-neutral-400'><BsLink45Deg />
                            <a href="https://romanhumagain.com.np"
                                target="_blank"
                                rel="noopener noreferrer" className='text-sm text-sky-500 dark:text-sky-100'>romanhumagain.com.np</a>
                        </p>

                    </div>

                    <div className='col-span-8 '>
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-5'>
                                <p className='text-xl text-gray-900 dark:text-neutral-200'>{user?.username}</p>
                                <div className='flex items-center gap-3'>
                                    <button className='p-1 px-2 bg-gray-300 border border-gray-400 rounded-xl text-black/95 dark:bg-neutral-800 dark:text-white/95 dark:border-neutral-700'>Edit Profile</button>
                                    <IoMdSettings className='text-2xl text-neutral-800 dark:text-gray-200' />
                                </div>
                            </div>
                            <div className='w-full mb-3 '>
                                <p className='text-gray-600 dark:text-neutral-400'>{user?.email}</p>
                            </div>
                            <div className='flex gap-8'>
                                <p className='text-[17px] font-semibold text-gray-800 dark:text-gray-200'>{profileBlogPosts?.length} Posts</p>
                                <p className='text-[17px] font-semibold text-gray-800 dark:text-gray-200'>700 Follower</p>
                                <p className='text-[17px] font-semibold text-gray-800 dark:text-gray-200'>69 Following</p>

                            </div>
                        </div>
                    </div>
                </div>
                {/* for blog */}
                <div className='px-6 mt-3 text-sm text-gray-800 dark:text-neutral-300'>
                    <p>I love to share my thoughts and ideas through blogs ...</p>
                </div>

                {/* for social media link */}
                <div className="flex px-6 mt-5 space-x-4">
                    {/* GitHub Link */}
                    <a
                        href="https://github.com/romanhumagain"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-neutral-100"
                    >
                        <FaGithub className="text-2xl" />
                    </a>

                    {/* LinkedIn Link */}
                    <a
                        href="https://linkedin.com/in/romanhumagain"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-neutral-100"
                    >
                        <FaLinkedin className="text-2xl" />
                    </a>
                    <a
                        href="https://linkedin.com/in/romanhumagain"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-neutral-100"
                    >
                        <FaXTwitter className="text-2xl" />
                    </a>

                    {/* Personal Website Link */}
                    <a
                        href="https://romanhumagain.com.np"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-neutral-100"
                    >
                        <FaGlobe className="text-2xl" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default ProfileItem