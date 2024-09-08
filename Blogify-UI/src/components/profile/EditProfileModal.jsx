import React from 'react'
import { useState } from 'react'
import { MdCancel } from "react-icons/md";
import pp_img from '../../assets/pp.jpg'
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { useProfile } from '../../context/ProfileContext';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';


const EditProfileModal = ({ isOpen, onClose, user }) => {
    console.log(user)
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [isSocialDivOpen, setIsSocialDivOpen] = useState(false);

    const [profilePic, setProfilePic] = useState(user?.profile_pic)
    const [selectedProfilePic, setSelectedProfilePic] = useState(null)


    const { axiosInstance, logoutUser } = useAuth();
    const { setIsUpdated } = useProfile();

    const params = useParams();
    const slug = params.slug;

    const toggleModal = () => {
        setIsModalOpen(!isOpen);
        onClose()
    };

    const handleProfilePictureChange = (e) => {
        const profile_image = e.target.files[0]
        setSelectedProfilePic(profile_image)

        const reader = new FileReader()
        reader.onloadend = () => {
            setProfilePic(reader.result)
        };
        reader.readAsDataURL(profile_image)
    }

    const form = useForm({
        defaultValues: {
            full_name: user?.full_name,
            username: user?.username,
            email: user?.email,
            bio: user?.bio,
            github_link: user?.profile_links.github_link,
            linkedin_link: user?.profile_links.linkedin_link,
            personal_website_link: user?.profile_links.personal_website_link
        }
    });
    const { register, formState, handleSubmit, reset, getValues } = form;
    const { errors, } = formState;

    const handleEditProfile = async (formData) => {
        try {
            const form = new FormData();
            if (selectedProfilePic) form.append('profile_pic', selectedProfilePic);

            form.append('full_name', formData.full_name);
            form.append('username', formData.username);
            form.append('bio', formData.bio);
            form.append('github_link', formData.github_link);
            form.append('linkedin_link', formData.linkedin_link);
            form.append('personal_website_link', formData.personal_website_link);
            console.log(form)

            const response = await axiosInstance.patch(`user-details/${slug}/`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200) {
                console.log(response);
                setIsUpdated(true);
                reset();
                onClose();
                toast.success("Successfully updated profile!");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    logoutUser();
                }
                console.log(error);
                toast.error(error.response.data.detail || "An error occurred");
            } else {
                console.log(error);
                toast.error("An error occurred");
            }
        }
    };


    return (
        <>
            <div className={`fixed  top-0 right-0 z-50 bottom-0  justify-start bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-950 w-full md:w-1/4 lg:w-[27%] rounded-l-2xl border-l shadow-xl border-gray-300 dark:border-neutral-500 ${isModalOpen ? "opacity-100" : "opacity-0 invisible"}`}
                role="dialog"
                aria-modal="true">
                <div className='p-8'>
                    <div>
                        <button
                            type="button"
                            className="absolute top-3 end-2.5 text-neutral-700 dark:text-gray-400 bg-transparent hover:bg-neutral-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-400 dark:hover:text-white"
                            onClick={toggleModal}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <p className='px-1 text-2xl font-semibold text-gray-800 dark:text-gray-200'>Profile</p> */}

                    {/* [profile section start here] */}
                    <div>
                        <form onSubmit={handleSubmit(handleEditProfile)}>
                            <iv className='flex items-center justify-center p-5'>
                                <div className="relative rounded-full w-28 h-28">
                                    <img
                                        src={profilePic}
                                        className="object-cover w-full h-full rounded-full"
                                        alt="Profile"
                                    />

                                    <p className=' p-1 rounded-full bg-neutral-600 absolute top-2 -right-1 translate-x-[-50%] translate-y-[-50%] text-lg text-neutral-300 cursor-pointer'
                                        onClick={() => document.getElementById('profileInput').click()}>
                                        <FaUserEdit />
                                    </p>
                                    
                                    <input id='profileInput' className='hidden' type='file' onChange={handleProfilePictureChange}></input>
                                </div>
                            </iv>

                            <div className=''>
                                <input className='px-1 py-2 text-xl text-gray-800 bg-transparent border-b-2 border-gray-500 shadow-sm dark:text-gray-200 focus:outline-none dark:border-neutral-700' type='text'
                                    {...register("full_name", {
                                        required: {
                                            message: 'Full name is required !',
                                            value: true
                                        }
                                    })}></input>
                            </div>

                            <div className='flex items-center w-full gap-2 px-1 mt-4 text-gray-600 text-md dark:text-neutral-400'>
                                <MdOutlineMailLock className='text-lg' />
                                <p className=''>{user?.email}</p>
                            </div>
                            <p className='px-1 mt-2 text-xs text-neutral-500'>You can't change your email from here !</p>
                            <div className='mt-2'>
                                <input className='w-auto px-1 py-2 text-gray-800 bg-transparent border-b-2 border-gray-500 text-md dark:text-gray-200 focus:outline-none dark:border-neutral-700' type='text'
                                    {...register("username", {
                                        required: {
                                            message: 'username is required !',
                                            value: true
                                        }
                                    })}
                                ></input>
                            </div>
                            <textarea
                                id="bio"
                                className="w-full px-4 py-3 mt-5 overflow-hidden text-gray-800 bg-transparent border border-gray-300 rounded-lg shadow-sm resize-none dark:text-gray-200 dark:border-neutral-700 dark:placeholder:text-neutral-600 focus:outline-none"
                                placeholder="Write something interesting about yourself..."
                                rows="2"
                                {...register("bio")}

                            />
                            <div>
                                <div className='flex items-center gap-2 mt-5 font-semibold text-gray-900 dark:text-neutral-300'>
                                    {!isSocialDivOpen ? <MdKeyboardArrowRight className='text-2xl' onClick={() => setIsSocialDivOpen(true)} /> : <MdKeyboardArrowDown className='text-2xl' onClick={() => setIsSocialDivOpen(false)} />}

                                    <CiLink className='text-2xl' />
                                    <p>Social Links</p>
                                </div>

                                <div className={`${!isSocialDivOpen && 'hidden'} px-8 duration-700`}>
                                    <div className='flex items-center gap-1 mt-4 text-gray-900 dark:text-neutral-300'>
                                        <FaGithub className='text-xl' />
                                        <input
                                            className={`${user?.profile_links.github_link ? 'w-full' : 'w-auto'} px-1 py-1 text-gray-800 bg-transparent border-b-2 border-gray-500 text-md dark:text-gray-200 focus:outline-none dark:border-neutral-700 dark:placeholder:text-neutral-600`}
                                            type='text'
                                            placeholder='https://github.com/'
                                            {...register("github_link")}
                                        />

                                    </div>
                                    <div className='flex items-center gap-1 mt-4 text-gray-900 dark:text-neutral-300'>
                                        <FaLinkedin className='text-xl' />
                                        <input
                                            className={`${user?.profile_links.linkedin_link ? 'w-full' : 'w-auto'} px-1 py-1 text-gray-800 bg-transparent border-b-2 border-gray-500 text-md dark:text-gray-200 focus:outline-none dark:border-neutral-700 dark:placeholder:text-neutral-600`}
                                            type='text'
                                            placeholder='https://www.linkedin.com/in/'
                                            {...register("linkedin_link")}
                                        />
                                    </div>

                                    <div className='flex items-center gap-1 mt-4 text-gray-900 dark:text-neutral-300'>
                                        <FaGlobe className='text-xl' />
                                        <input
                                            className={`${user?.profile_links.personal_website_link ? 'w-full' : 'w-auto'} px-1 py-1 text-gray-800 bg-transparent border-b-2 border-gray-500 text-md dark:text-gray-200 focus:outline-none dark:border-neutral-700 dark:placeholder:text-neutral-600`}
                                            type='text'
                                            placeholder='your personal website'
                                            {...register("personal_website_link")}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <button className='p-1 px-2 font-semibold text-white transition-colors duration-500 rounded-lg bg-sky-600 hover:bg-sky-700' type='submit'>Save Changes</button>

                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EditProfileModal