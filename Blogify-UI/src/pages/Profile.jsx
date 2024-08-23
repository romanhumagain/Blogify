import React, { useState } from 'react'
import ProfileItem from '../components/profile/ProfileItem';
import { useAuth } from '../context/AuthContext';
import ProfilePostItem from '../components/profile/ProfilePostItem';

const Profile = () => {
  const { authenticatedUser } = useAuth()
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full dark:bg-neutral-950'>
        <div className='w-full max-w-2xl '>
          {/* for top profile info */}
          <ProfileItem user={authenticatedUser} />

          <hr className='mx-5 mt-5 border-gray-400 border-1 dark:border-neutral-600'></hr>


        </div>
        <div className=''>
          <ProfilePostItem />
        </div>
      </div>
    </>
  )
}

export default Profile