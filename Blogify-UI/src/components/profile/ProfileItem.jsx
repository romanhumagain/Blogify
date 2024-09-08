import React, { useState } from 'react'
import pp_img from '../../assets/pp.jpg'
import { IoMdSettings } from "react-icons/io";
import { IoDocumentText, IoDocumentTextOutline, IoArchive, IoArchiveOutline, IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { useBlog } from '../../context/BlogContext';
import EditProfileModal from './EditProfileModal';
import { useAuth } from '../../context/AuthContext';

const ProfileItem = ({ user }) => {
    const { profileBlogPosts } = useBlog();
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
    const {authenticatedUser} = useAuth();

    const handleCloseModal = () => {
        setIsEditProfileModalOpen(false)
    }
    return (
        <>
            <div className='flex flex-col justify-center mt-10'>
                <div className='grid items-center justify-center grid-cols-10 gap-6 '>
                    <div className="flex flex-col items-end justify-end col-span-3 px-5 ">
                        <div className="relative overflow-hidden rounded-full w-28 h-28">
                            <img
                                src={user?.profile_pic}
                                className="object-cover w-full h-full"
                                alt="Profile"
                            />
                        </div>
                    </div>

                    <div className='col-span-7 '>
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-5'>
                                <p className='text-xl text-gray-900 dark:text-neutral-200'>{user?.username}</p>
                                
                                <div className={`${authenticatedUser?.slug !== user?.slug && 'hidden'} flex items-center gap-3 `}>
                                    <button className='p-1 px-2 bg-gray-300 border border-gray-400 rounded-xl text-black/95 dark:bg-neutral-800 dark:text-white/95 dark:border-neutral-700' onClick={() => setIsEditProfileModalOpen(!isEditProfileModalOpen)}>Edit Profile</button>
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
                <div className='px-10 mt-3 text-sm text-gray-800 dark:text-neutral-300'>
                    {user?.profile_links.personal_website_link &&
                        <p className='flex items-center mt-1 mb-2 text-gray-700 text-start dark:text-neutral-400'><BsLink45Deg />
                            <a href={`https://${user?.profile_links.personal_website_link}`}
                                target="_blank"
                                rel="noopener noreferrer" className='text-sm text-sky-500 dark:text-sky-100'>{user?.profile_links.personal_website_link}</a>
                        </p>
                    }


                    <p className='px-1'>{user?.bio}</p>
                </div>

                {/* for social media link */}
                <div className="flex px-12 mt-5 space-x-4">
                    {/* GitHub Link */}
                    {user?.profile_links.github_link &&
                        <a
                            href={user?.profile_links.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-neutral-100"
                        >
                            <FaGithub className="text-2xl" />
                        </a>
                    }

                    {/* LinkedIn Link */}
                    {user?.profile_links.linkedin_link &&
                        <a
                            href={user?.profile_links.linkedin_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-neutral-100"
                        >
                            <FaLinkedin className="text-2xl" />
                        </a>
                    }

                    {/* Personal Website Link */}
                    {user?.profile_links.personal_website_link &&
                        <a
                            href={`https://${user?.profile_links.personal_website_link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-neutral-100"
                        >
                            <FaGlobe className="text-2xl" />
                        </a>
                    }
                </div>
            </div>
            {isEditProfileModalOpen &&
                <EditProfileModal isOpen={isEditProfileModalOpen} onClose={handleCloseModal} user={user} />
            }
        </>
    )
}

export default ProfileItem