import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import OTPModal from '../components/OTPModal';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import PopularSection from '../components/PopularSection';


const Home = () => {
  const { user, authenticatedUser, fetchAuthenticatedUser } = useAuth()
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    if (user && authenticatedUser) {
      if (!authenticatedUser.is_verified) {
        setTimeout(() => {
          setIsOtpModalOpen(true)
        }, 1200)
      }
    }
  }, [user, authenticatedUser])

  // useEffect(()=>{
  //   setTimeout(() => {
  //     {!user && 
  //     Swal.fire({
  //   title: "Please Sign in your blogify account",
  //   showCancelButton: true,
  //   confirmButtonText: "Sing in now",
  //   confirmButtonColor:'teal',
  //   cancelButtonText:"Sign in Later",
  //   cancelButtonColor:'red'
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     navigate('/login')
  //   } 
  // });
  //   }
  //   }, 1500);


  // },[user])

  return (
    <>
      <div className='h-auto flex justify-center items-center mt-5'>
        <div className='mt-10 '>
          {user &&
            <p className='text-center text-3xl font-semibold text-gray-600 dark:text-gray-300'>Welcome {user.name}</p>
          }
          <div className='flex flex-col justify-center items-center text-black-500 font-light text-2xl p-10 dark:text-gray-300'>
            <p>This page is under Construction. Keep visiting us !</p><br />
            {user ? <p>You are a authenticated user</p> : <p className='text-red-500'>You are not authenticated. Please login your account </p>}
          </div>
          {isOtpModalOpen && (
            <OTPModal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)} fetchAuthenticatedUser={fetchAuthenticatedUser} />
          )}
        </div>
      </div>

    </>

  )
}

export default Home