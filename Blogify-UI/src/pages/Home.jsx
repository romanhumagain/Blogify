import React, {useEffect, useState} from 'react'
import { useAuth } from '../context/AuthContext'
import OTPModal from '../components/OTPModal';

const Home = () => {
  const {user, fetchAuthenticatedUser } = useAuth()
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const authenticated_user = localStorage.getItem("authenticated_user") ? JSON.parse(localStorage.getItem("authenticated_user")):null
  useEffect(()=>{
    if(user&&authenticated_user){
      if(!authenticated_user.is_verified){
        setTimeout(()=>{
          setIsOtpModalOpen(true)
        },1200)
      }
    }
  },[])
  
  return (
    <>
    <div className='flex justify-center items-center text-black-500 font-light text-2xl p-10'>
      <p>This page is under Construction. Keep visiting us !</p><br/>
      {user?<p>You are a authenticated user</p>:<p className='text-red-500'>You are not authenticated. Please login your account </p>}
    </div>
    {isOtpModalOpen && (
        <OTPModal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)} fetchAuthenticatedUser={fetchAuthenticatedUser} />
      )}
    </>
  )
}

export default Home