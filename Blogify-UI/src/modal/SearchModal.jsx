import React from 'react'
import { useState, useEffect } from 'react'
import { MdCancel } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import SearchList from './SearchList';

const SearchModal = ({ isOpen, closeModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [searchedData, setSearchedData] = useState("");
    const [searchedUserData, setSearchedUserData] = useState([]);
    const [isSearchItemRemoved, setIsSearchedItemRemoved] = useState(false);

    const { axiosInstance, logoutUser } = useAuth();

    const handleSearchData = (e) => {
        setSearchedData(e.target.value);
    }

    const searchUser = async () => {
        try {
            const response = await axiosInstance.get(`fetch-user/?search=${searchedData}`);
            if (response.status === 200) {
                setSearchedUserData(response.data);
                // console.log(response.data)
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    logoutUser()
                }
            }
            console.log("Error while searching user data", error)
        }
    }

    // to fetch all the search details
    const fetchSearchedUser = async () => {
        try {
            const response = await axiosInstance.get('recent-search')
            if (response.status === 200) {
                const searchedUser = response.data.map((data) => data.searched_user)
                setSearchedUserData(searchedUser)
                console.log(searchedUser)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    logoutUser()
                }
            }
            console.log("Error while searching user data", error)
        }
    }

    // to clear all searches
    const clearSearchHistory = async ()=>{
        try {
            const response = await axiosInstance.delete(`clear-all-search/`)
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

    useEffect(() => {
        if (searchedData) {
            const timeout = setTimeout(() => {
                searchUser();
            }, [800])

            return () => {
                clearTimeout(timeout);
            }
        }

    }, [searchedData])

    useEffect(() => {
        fetchSearchedUser()
    }, [])

    // to fetch all the recently searched user
    useEffect(() => {
        if (isSearchItemRemoved) {
            fetchSearchedUser()
            setIsSearchedItemRemoved(false)
        }
    }, [isSearchItemRemoved])

    return (
        <>
            <div className={`fixed right-0 top-0 z-50 left-20 bottom-0  justify-start bg-gray-100 dark:bg-neutral-950 w-full md:w-1/4 lg:w-[27%] rounded-r-2xl border-r border-gray-300 dark:border-neutral-500 ${isModalOpen ? "opacity-100" : "opacity-0 invisible"}`}
                role="dialog"
                aria-modal="true">
                <div className='p-8'>
                    <p className='px-1 text-2xl font-semibold text-gray-800 dark:text-gray-200'>Search</p>

                    <div className='relative mt-2'>
                        <input type='text' value={searchedData} className='w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-xl dark:bg-neutral-800 focus:outline-none dark:border-neutral-700 dark:text-white placeholder:text-neutral-500' placeholder='Search'
                            onChange={handleSearchData}></input>
                        {searchedData &&
                            <MdCancel className='absolute text-red-600 -translate-y-1/2 cursor-pointer right-2 top-1/2 dark:text-red-600' onClick={()=> setSearchedData("")} />
                        }
                    </div>

                    <hr className='mx-1 mt-6 border-gray-400 border-1 dark:border-neutral-700' />

                    <div className='flex justify-between'>
                        <p className='px-1 mt-1 font-semibold text-gray-600 text-md dark:text-neutral-500'>Recent</p>
                        <p className={`${searchedUserData.length <= 0 && 'hidden'} px-1 mt-1 font-semibold text-blue-600 cursor-pointer dark:text-blue-500 text-md`} onClick={()=>clearSearchHistory()}>Clear all</p>
                    </div>

                    <div className='flex flex-col items-center justify-center h-full'>
                        {/* <p className='px-1 mt-20 text-lg text-gray-600 dark:text-neutral-500'>No Recent Searches</p> */}
                        {searchedUserData.length > 0 ? searchedUserData.map((data, ind) => (
                            <div key={data.slug}>
                                <SearchList data={data} closeModal={closeModal} setIsSearchedItemRemoved={setIsSearchedItemRemoved} />
                            </div>
                        )) : (
                            <p className='mt-5 text-neutral-500'>No Search Details Found !</p>
                        )}

                    </div>
                </div>

            </div>
        </>
    )
}

export default SearchModal