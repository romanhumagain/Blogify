import React, { useState, useEffect } from 'react'
import ProfileItem from '../components/profile/ProfileItem';
import { useAuth } from '../context/AuthContext';
import ProfilePostItem from '../components/profile/ProfilePostItem';
import { useParams } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';


const Profile = () => {
  const { fetchProfileDetails, setUserSlug, authenticatedUserDetails } = useProfile();
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      setUserSlug(slug)
      fetchProfileDetails(slug)
    }
  }, [slug])

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full dark:bg-neutral-950'>
        <div className='w-full max-w-2xl '>
          {/* for top profile info */}
          <ProfileItem user={authenticatedUserDetails} />

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