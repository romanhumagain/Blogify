import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const SearchList = ({ data, closeModal, setIsSearchedItemRemoved }) => {
    const navigate = useNavigate();
    const { axiosInstance, logoutUser} = useAuth();
    const user_slug = data.slug


    // add to recent search history 

    const addToSearchHistory = async () => {

        const data = {
            slug: user_slug
        }
        try {
            const response = await axiosInstance.post('recent-search/', data)
            if (response.status === 201) {
                console.log("done hgjhg")
                navigate(`profile/${data.slug}`)
                closeModal()

            }
        } catch (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    logoutUser()
                }
            }
            console.log(error)
        }
    }

    const navigatePage = async () => {
        addToSearchHistory()
    }

    const removeFromSearchHistory = async (slug)=>{
        try {
            const response = await axiosInstance.delete(`remove-recent-search/${slug}`)
            if (response.status === 200) {
                setIsSearchedItemRemoved(true)
            }
            
        } catch (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    logoutUser()
                }
            }
            console.log(error)
        }
    }

    return (
        <>
            <div className='grid items-center grid-cols-12 p-2 mt-5 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800' >
                <div className='grid grid-cols-12 col-span-11 cursor-pointer' onClick={()=>navigatePage()}>

                    <div className='flex justify-center col-span-2 '>
                        <img className='object-cover w-12 h-12 transition-transform duration-700 rounded-full cursor-pointer hover:scale-105' src={data?.profile_pic} ></img>
                    </div>

                    <div className='col-span-10 px-3'>
                        <p className='text-md text-neutral-800 dark:text-gray-300'>{data?.username}</p>
                        <p className='text-sm text-neutral-500'>{data?.full_name}</p>
                    </div>

                </div>
                <div className='col-span-1'>
                    <RxCross1 className='text-xl transition-transform cursor-pointer text-neutral-500 hover:scale-105 hover:text-neutral-700 dark:hover:text-neutral-300' title='Remove' onClick={()=> removeFromSearchHistory(data?.slug)} />
                </div>
            </div>
        </>
    )
}

export default SearchList