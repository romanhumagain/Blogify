import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import OTPModal from '../components/OTPModal';

const Home = () => {
  const { user, authenticatedUser, fetchAuthenticatedUser } = useAuth()
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  useEffect(() => {
    if (user && authenticatedUser) {
      if (!authenticatedUser.is_verified) {
        setTimeout(() => {
          setIsOtpModalOpen(true)
        }, 1200)
      }
    }
  }, [user, authenticatedUser])

  return (
    <>
      <div className='bg-slate-100 h-screen  justify-center items-center'>


        {user &&
          <p className='text-center text-3xl font-semibold text-gray-600'>Welcome {user.name}</p>
        }
        <div className='flex justify-center items-center text-black-500 font-light text-2xl p-10'>
          <p>This page is under Construction. Keep visiting us !</p><br />
          {user ? <p>You are a authenticated user</p> : <p className='text-red-500'>You are not authenticated. Please login your account </p>}
        </div>
        {isOtpModalOpen && (
          <OTPModal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)} fetchAuthenticatedUser={fetchAuthenticatedUser} />
        )}
      </div>
    </>
  )
}

export default Home