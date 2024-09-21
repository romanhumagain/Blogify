import React, { useState, useEffect } from 'react'
import ProfileItem from '../components/profile/ProfileItem';
import ProfilePostItem from '../components/profile/ProfilePostItem';
import { useParams } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { Toaster } from 'react-hot-toast';
import { useBlog } from '../context/BlogContext';


const Profile = () => {
  const [profileSlug, setProfileSlug] = useState(null)
  const { fetchProfileDetails, setUserSlug, authenticatedUserDetails } = useProfile();  
  const {setUserProfileSlug} = useBlog();
  const params = useParams();
  const slug = params.slug;

  useEffect(()=>{
    setProfileSlug(slug)
    setUserProfileSlug(slug)
  }, [slug])


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
        <div className='w-full max-w-2xl '>
          <ProfilePostItem user={authenticatedUserDetails} slug={slug} />
        </div>
      </div>
      <Toaster />

    </>
  )
}

export default Profile